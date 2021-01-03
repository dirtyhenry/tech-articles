---
layout: post
title: Lessons learned from testing a React front with Cypress
---

End-to-end testing is rarely the hot subject a team will fight about to tackle.
But it is useful for at least 2 scenarios:

- basic tests objectives: detect regressions, bugs, crashes, etc.;
- automate & speed up the process of seeding a system.

## Why Cypress?

Here is a list of features that will help decide what the best solution is:

- Gitlab's CI compatibility
- SauceLabs compatibility
- Visual regression tools
- Debugging tools
- Ease of maintenance of the tests
- Ease of use by non-technical people (ideally, it should be used by the Product
  team)
- Size of the community
- Confidence in the product long-term

### Because Selenium is not the right choice

After spending a day poking around Selenium's Node port:

Selenium via Node is not mature (the doc of v4 is limited and hard to read) and
quite buggy (submitting a form on Firefox just doesn't work). When deciding to
commit to Selenium, you must handle it via Java directly as it seems to work
much better this way.

The WebDriver protocol doesn't allow to use `dom-testing-library`-like features:
we can only fetch elements via id, name, etc. but not via visually appearing
elements (except for links exclusively). There is no obvious workaround given
the nature of how JS is injected in the browser to retrieve elements. As a
consequence, I guess WebDriver.IO or Nightwatch or other layers on top of
Selenium shouldn't even be evaluated for the time being.

### Cypress' promises

Cypress is a modern solution that is compatible with `dom-testing-library`.
Minus points for a non-compatibility with Sauce Labs for the time being but they
promise it could work in the future (and they seem well-funded so promises could
be resolved).

### The tooling around it

- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)
- [Chance](https://chancejs.com)
- [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)

## Troubleshooting

### How to avoid unnecessary waits?

You can wait for a button to be enabled this way:

```js
1.  cy.getByText('Suivant').as('next');
2.  cy.get('@next').should('be.enabled').click();
```

Here is a line-by-line explanation of how it works:

1. Get the DOM element with our usual `getByTest` and _alias_ for further
   reference;
1. Use Cypress' native `get` with the alias, assert/wait that the button is
   enabled, and then click on it.

The difference between `getByText` and `get` is that `getByText` asserts
`be.enable` right away and won't wait the same way Cypress does. Cf.
[this doc](https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-wait-for-cy-get)
from Cypress:

> Whenever commands have an assertion they will not resolve until their
> associated assertions pass. This enables you to simply describe the state of
> your application without having to worry about when it gets there.
