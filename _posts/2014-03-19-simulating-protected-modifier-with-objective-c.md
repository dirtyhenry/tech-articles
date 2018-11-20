---
layout: default
title: Simulating protected properties and selectors in Objective-C
category: blog
---

# Simulating protected properties and selectors in Objective-C

There's no `protected` modifier in Objective-C. In a sense, we should be grateful that Objective-C is not Java. On the other hand, sometimes it can suck. What's the best way to deal with it? Let's simulate protection!
{: .lead}


## The problem is already asked and answered

When looking for a solution to this, I found these two StackOverflow posts:

- [Expose a private Objective-C method or property to subclasses](http://stackoverflow.com/questions/12633627/expose-a-private-objective-c-method-or-property-to-subclasses)
- [Protected methods in objective-c](http://stackoverflow.com/questions/3725857/protected-methods-in-objective-c)

which exposed the real case where the lack of `protected` sucks (ie subclassing) and also the solution to the problem (ie simulating protection) as used by Apple herself in classes such as [`UIGestureRecognizer`](https://developer.apple.com/library/ios/documentation/uikit/reference/UIGestureRecognizer_Class/Reference/Reference.html).


## A Concrete Example

### The public...

Let's say I have a `BSDaddy` base class with only one publicly declared taskk:

{% highlight objc %}
@interface BSDaddy : NSObject

- (NSString *)introduction;

@end
{% endhighlight %}

Now I want a `BSSon` class, inheriting from `BSDaddy`.

{% highlight objc %}
#import "BSDaddy.h"

@interface BSSon : BSDaddy

@end
{% endhighlight %}


### ... the protected...

Let's say, Dad has information it should share with his son, like an address for instance. Let's create a new file `BSDaddySubclass.h` in which we declared this kind of stuff.

{% highlight objc %}
@interface BSDaddy ()

@property(nonatomic, strong) NSString *protectedAddress;

- (NSString *)healthInsuranceId;

@end
{% endhighlight %}

Please not that I'm using `()` instead of something more precise like `(subclass)` cause otherwise, the properties are not auto-synthetized.

### ... and the private

Here is a basic implementation of Dad, in which we also defined stuff we want to keep private from Son.

{% highlight objc %}
#import "BSDaddy.h"
#import "BSDaddySubclass.h"

@interface BSDaddy ()

@property(weak, nonatomic) NSString *secretSexFantasy;

- (NSNumber *)creditCardPinNumber;

@end

@implementation BSDaddy

- (id)init {
    self = [super init];
    if (self) {
        self.protectedAddress = @"Hill Valley";
        self.secretSexFantasy = @"being disguised as an alien";
    }
    return self;
}

- (NSString *)introduction {
    return @"Hi! My name is George McFly!";
}

- (NSString *)healthInsuranceId {
    return @"123456789";
}

- (NSNumber *)creditCardPinNumber {
    return [NSNumber numberWithInteger:1234];
}
{% endhighlight %}

Please note that we reuse `()` for the new interface declaration, it will not conflict with the one in `BSDaddySubclass.h`

### Now let's implement Son

Son is a rebel and want to share everything about his dad when he introduces himself.

{% highlight objc %}
#import "BSSon.h"
#import "BSDaddySubclass.h"

@implementation BSSon

- (NSString *)introduction {
    // Property 'secretSexFantasy' not found on object of type 'BSSon *'
    //NSString *myDadSecretFantasy = self.secretSexFantasy;

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wundeclared-selector"

    NSString *myDadSecretFantasy = nil;
    NSNumber *creditCardPinNumber = nil;
    if ([self respondsToSelector:@selector(secretSexFantasy)]) {
        myDadSecretFantasy = [self performSelector:@selector(secretSexFantasy) withObject:nil];
    }

    if ([self respondsToSelector:@selector(creditCardPinNumber)]) {
        creditCardPinNumber = [self performSelector:@selector(creditCardPinNumber) withObject:nil];
    }

#pragma clang diagnostic pop

    return [NSString stringWithFormat:@"Hi! I'm Marty. My dad says: “%@”. He'll be mad cause I'm making public that we live in %@ and his health insurance ID is %@. He'll be even madder after I tell you his secret sex fantasy is %@, and that his credit card PIN number is %@.", [super introduction], self.protectedAddress, [self healthInsuranceId], myDadSecretFantasy, creditCardPinNumber];
}
{% endhighlight %}

Please note:

1. `BSDaddySubclass.h` is imported.
2. The properties and tasks declared in `BSDad.m` can't be used: you will get a compilation error if you try
3. The properties and tasks declared in `BSDadSubclass.h` CAN be used normally without the need of an extra `@synthesize` or `@dynamic` for properties.
4. Most importantly, please note that this is just *simulated protection*, which relies on a **convention**! If another class decides to import `BSDadSubclass.h`, nothing will prevent it to do so and use the protected methods as public ones. You just need to *establish the convention that this is bad programming* within your team. To make this even clearer, remember as well that *there is no such things as private methods* either. If you know a private method exists, you can still call it. That's the power of Objective-C and remember what Uncle Ben said: “With great power comes great responsability”!
5. Optional: notice also the several `#pragma` that will prevent you to get warnings when trying to perform private selectors in your code. If you need them, you should be aware maybe you're doing something nasty.

## Conclusion

This is how George and Marty will introduce themselves:

![Hello George and Marty](../../assets/images/inheritance.png "Nasty Marty")

You can find the full source code of this example on [my iOS Demo code][demo-ios] on GitHub.

And again, if you want to address me some feedback or comments, it's via [Twitter][twitter] or [GitHub][github].

[github]: https://github.com/dirtyhenry/bootstragram-blog/issues "Issues"
[twitter]: http://twitter.com/dirtyhenry
[demo-ios]: https://github.com/Bootstragram/bootstragram-ios
