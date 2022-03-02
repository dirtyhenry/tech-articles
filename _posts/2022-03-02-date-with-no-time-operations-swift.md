---
layout: post
id: 56DD99A3-059D-437E-83AC-97EA88467AEE
title: Dealing With Dates With No Time in Swift
author: Mick F
excerpt: >-
  Exploring some code wrappring dates with no time, ie represented as strings in
  the YYYY‑MM‑DD ISO 8601 format.
category: Journaling
tags:
  - Swift
  - iOS
---

## Where the ~~Streets~~ Dates Have No ~~Name~~ Time

_Where the Streets Have No Name_, the U2 song, was released on 31 August 1987.
At what time? It is not relevant. Just the date, ie the calendar day, matters.
If I had to translate this in a JSON API, I would write the following:
`{"release_date": "1987-08-31"}`, ie basic ISO 8601, no time or time zone.

When dealing with such _dates with no time_, some operations can be necessary.
For instance, what is the 7th day after 31 August 1987? No dependency allowed.
This blog post will answer this question. Easy peasy, right?

But beware, the experienced developer should be humble when coding such
operations. Dealing with calendars is hard and I can easily prove it. Just
answer this simple question: is every minute in a calendar 60 seconds long? If
you answered “yes”, you failed the test.
[Go study and have fun](https://yourcalendricalfallacyis.com).

Hopefully, Swift’s `Foundation` provides everything we need to avoid obvious
traps. Let’s see what a struct to handle _dates with no time_ could look like.

## The implementation

This is the end result. A discussion follows.

```swift
import Foundation

/// A string that represents dates using their ISO 8601 representations.
///
/// `DateString` is a way to handle dates with no time — such as `2022-03-02` for March 2nd of 2022 — to
/// perform operations with convenience including adding days, dealing with ranges, etc.
///
/// ## Usage Overview
///
/// A date string can be initiated from a string literal, and can be used to create ranges.
///
///     let dateString: DateString = "2022-03-01"
///     let aWeekLater = dateString.advanced(by: 7)
///     for day in march1st ..< aWeekLater {
///       print(day)
///     }
public struct DateString {
    // MARK: - Creating an instance

    /// Returns a date string initialized using their ISO 8601 representation.
    /// - Parameters:
    ///   - dateAsString: The ISO 8601 representation of the date. For instance, `2022-03-02`for March 2nd of 2022.
    ///   - calendar: The calendar — including the time zone — to use. The default is the current calendar.
    /// - Returns: A date string, or `nil` if a valid date could not be created from `dateAsString`.
    public init?(from dateAsString: String, calendar: Calendar = .current) {
        let formatter = Self.createFormatter(timeZone: calendar.timeZone)
        guard let date = formatter.date(from: dateAsString) else {
            return nil
        }

        self.init(date: date, calendar: calendar, formatter: formatter)
    }

    /// Returns a date string initialized using their ISO 8601 representation.
    /// - Parameters:
    ///   - date: The date to represent.
    ///   - calendar: The calendar — including the time zone — to use. The default is the current calendar.
    public init(date: Date, calendar: Calendar = .current) {
        self.init(date: date, calendar: calendar, formatter: Self.createFormatter(timeZone: calendar.timeZone))
    }

    private init(date: Date, calendar: Calendar = .current, formatter: ISO8601DateFormatter) {
        self.formatter = formatter
        self.date = date
        self.calendar = calendar
    }

    // MARK: - Properties

    private let formatter: ISO8601DateFormatter
    private let date: Date
    private let calendar: Calendar

    private static func createFormatter(timeZone: TimeZone) -> ISO8601DateFormatter {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withFullDate]
        formatter.timeZone = timeZone
        return formatter
    }
}

extension DateString: ExpressibleByStringLiteral {
    public init(stringLiteral value: String) {
        self.init(from: value)!
    }
}

extension DateString: Strideable {
    public func distance(to other: DateString) -> Int {
        let timeInterval = date.distance(to: other.date)
        return Int(round(timeInterval / 86400.0))
    }

    public func advanced(by value: Int) -> DateString {
        let newDate = calendar.date(byAdding: .day, value: value, to: date)!
        return DateString(date: newDate, calendar: calendar, formatter: formatter)
    }
}
```

### Just how bad is DateString for a name?

I struggled to find a good name. I gave it a lot of thought and nothing better
came out. So I think it’s not that bad.

### Why are time zones involved in this code?

It’s the result of logical decisions I made from the tools I had at hand:

- Converting an ISO 8601 string? Use `ISO8601DateFormatter`!
- What type does `ISO8601DateFormatter` convert the input `String` into? As a
  `Date`!
- So I should use a `Date` — with time — to store a _date with no time_? Yes!
- How can I output the date back into a `String`? Use `ISO8601DateFormatter`
  again!
- But look at this test, it’s getting buggy around days on which clocks change
  to deal with daylight saving time? Use a time zone!
- So I have to carry a `Calendar` and a `TimeZone` around? No need: a `Calendar`
  does include a `TimeZone`, just carry the `Calendar` around!

### Implementing ExpressibleByStringLiteral is so easy and convenient!

Yes, it is. Expressing a `DateString` just as `"1987-08-31"` is indeed pretty
awesome.

### Wow, and what about implementing Strideable?

I know, right? On top of answering our original question
(`date.advanced(by: offset)`), `Strideable` helps doing things like:

```swift
let startDate: DateString = "2022-03-01"
let aWeekLater = startDate.advanced(by: 7)
for date in  startDate ..< aWeekLater {
  // do something.
}
```

### Wait a minute! Is this a hard-coded 86400 in the code? Isn’t that forbidden?

🕵️ Good eye. 86400 is the number of seconds in a typical day. But not all days
are 86400 seconds long. But the point here is to compute the distance in days
between two dates, and I think this implementation is OK. I'll explain why:

1. `Calendar` is ignoring leap seconds. I know because a former Apple Foundation
   employee [told me so][1].
1. See the `round`? This is enough to deal with daylight savings according to my
   tests and my understanding of how daylight savings work. Consider a
   collection that contains the number of seconds of an arbitrary number of
   **consecutive** days. (a) There's more than a 99% chance that a randomly
   picked item is 86400. (b) Considering that the 2 possible outliers values
   will alternate: if you find a 23-hour long day (82800 seconds) in the
   collection, you will find a 25-hour long day (90000 seconds) before you find
   another occurrence of a 23-hour long day. So the average of a set will tend
   to 86400 as it gets bigger.
1. Here is a more intellectually satisfying alternative for this computation. It
   might be more solid if you're working on something really time-sensitive. But
   it is about **2 times slower**. So as long as my fast implementation does not
   fail me, I'll stick to it.

```swift
let start = calendar.ordinality(of: .day, in: .era, for: self.date)
let end = calendar.ordinality(of: .day, in: .era, for: other.date)

guard let start = start, let end = end else {
    fatalError("The distance between 2 dates could not be computed.")
}

return end - start
```

## Conclusion

Mission accomplished. Feel free to use this `DateString` class as is. I've been
using it for a hobby project — a soccer newsletter — and it works great. If you
can read French and soccer is your thing, you can [sign up for the
newsletter][2].

## Addendum — macOS's Time Zones

Here is a table of all the known time zones' identifiers and abbreviations as of
macOS 12.2.1 & Swift 5.5.

For some reason, `UTC` is an abbreviation to the `UTC` identifier, but `UTC` is
missing in the list of known identifiers. 🤷‍♂️ I initalized a time zone using
`UTC`: it succeeded and querying the identifier returned `GMT`. Double-🤷‍♂️.

| Identifier                     | Abbreviations |
| ------------------------------ | ------------- |
| Africa/Abidjan                 |               |
| Africa/Accra                   |               |
| Africa/Addis_Ababa             | EAT           |
| Africa/Algiers                 |               |
| Africa/Asmara                  |               |
| Africa/Bamako                  |               |
| Africa/Bangui                  |               |
| Africa/Banjul                  |               |
| Africa/Bissau                  |               |
| Africa/Blantyre                |               |
| Africa/Brazzaville             |               |
| Africa/Bujumbura               |               |
| Africa/Cairo                   |               |
| Africa/Casablanca              |               |
| Africa/Ceuta                   |               |
| Africa/Conakry                 |               |
| Africa/Dakar                   |               |
| Africa/Dar_es_Salaam           |               |
| Africa/Djibouti                |               |
| Africa/Douala                  |               |
| Africa/El_Aaiun                |               |
| Africa/Freetown                |               |
| Africa/Gaborone                |               |
| Africa/Harare                  | CAT           |
| Africa/Johannesburg            |               |
| Africa/Juba                    |               |
| Africa/Kampala                 |               |
| Africa/Khartoum                |               |
| Africa/Kigali                  |               |
| Africa/Kinshasa                |               |
| Africa/Lagos                   | WAT           |
| Africa/Libreville              |               |
| Africa/Lome                    |               |
| Africa/Luanda                  |               |
| Africa/Lubumbashi              |               |
| Africa/Lusaka                  |               |
| Africa/Malabo                  |               |
| Africa/Maputo                  |               |
| Africa/Maseru                  |               |
| Africa/Mbabane                 |               |
| Africa/Mogadishu               |               |
| Africa/Monrovia                |               |
| Africa/Nairobi                 |               |
| Africa/Ndjamena                |               |
| Africa/Niamey                  |               |
| Africa/Nouakchott              |               |
| Africa/Ouagadougou             |               |
| Africa/Porto-Novo              |               |
| Africa/Sao_Tome                |               |
| Africa/Tripoli                 |               |
| Africa/Tunis                   |               |
| Africa/Windhoek                |               |
| America/Adak                   |               |
| America/Anchorage              |               |
| America/Anguilla               |               |
| America/Antigua                |               |
| America/Araguaina              |               |
| America/Argentina/Buenos_Aires | ART           |
| America/Argentina/Catamarca    |               |
| America/Argentina/Cordoba      |               |
| America/Argentina/Jujuy        |               |
| America/Argentina/La_Rioja     |               |
| America/Argentina/Mendoza      |               |
| America/Argentina/Rio_Gallegos |               |
| America/Argentina/Salta        |               |
| America/Argentina/San_Juan     |               |
| America/Argentina/San_Luis     |               |
| America/Argentina/Tucuman      |               |
| America/Argentina/Ushuaia      |               |
| America/Aruba                  |               |
| America/Asuncion               |               |
| America/Atikokan               |               |
| America/Bahia                  |               |
| America/Bahia_Banderas         |               |
| America/Barbados               |               |
| America/Belem                  |               |
| America/Belize                 |               |
| America/Blanc-Sablon           |               |
| America/Boa_Vista              |               |
| America/Bogota                 | COT           |
| America/Boise                  |               |
| America/Cambridge_Bay          |               |
| America/Campo_Grande           |               |
| America/Cancun                 |               |
| America/Caracas                |               |
| America/Cayenne                |               |
| America/Cayman                 |               |
| America/Chicago                | CDT, CST      |
| America/Chihuahua              |               |
| America/Costa_Rica             |               |
| America/Creston                |               |
| America/Cuiaba                 |               |
| America/Curacao                |               |
| America/Danmarkshavn           |               |
| America/Dawson                 |               |
| America/Dawson_Creek           |               |
| America/Denver                 | MDT           |
| America/Detroit                |               |
| America/Dominica               |               |
| America/Edmonton               |               |
| America/Eirunepe               |               |
| America/El_Salvador            |               |
| America/Fort_Nelson            |               |
| America/Fortaleza              |               |
| America/Glace_Bay              |               |
| America/Godthab                |               |
| America/Goose_Bay              |               |
| America/Grand_Turk             |               |
| America/Grenada                |               |
| America/Guadeloupe             |               |
| America/Guatemala              |               |
| America/Guayaquil              |               |
| America/Guyana                 |               |
| America/Halifax                | ADT, AST      |
| America/Havana                 |               |
| America/Hermosillo             |               |
| America/Indiana/Indianapolis   |               |
| America/Indiana/Knox           |               |
| America/Indiana/Marengo        |               |
| America/Indiana/Petersburg     |               |
| America/Indiana/Tell_City      |               |
| America/Indiana/Vevay          |               |
| America/Indiana/Vincennes      |               |
| America/Indiana/Winamac        |               |
| America/Inuvik                 |               |
| America/Iqaluit                |               |
| America/Jamaica                |               |
| America/Juneau                 | AKDT, AKST    |
| America/Kentucky/Louisville    |               |
| America/Kentucky/Monticello    |               |
| America/Kralendijk             |               |
| America/La_Paz                 |               |
| America/Lima                   | PET           |
| America/Los_Angeles            | PDT, PST      |
| America/Lower_Princes          |               |
| America/Maceio                 |               |
| America/Managua                |               |
| America/Manaus                 |               |
| America/Marigot                |               |
| America/Martinique             |               |
| America/Matamoros              |               |
| America/Mazatlan               |               |
| America/Menominee              |               |
| America/Merida                 |               |
| America/Metlakatla             |               |
| America/Mexico_City            |               |
| America/Miquelon               |               |
| America/Moncton                |               |
| America/Monterrey              |               |
| America/Montevideo             |               |
| America/Montreal               |               |
| America/Montserrat             |               |
| America/Nassau                 |               |
| America/New_York               | EDT, EST      |
| America/Nipigon                |               |
| America/Nome                   |               |
| America/Noronha                |               |
| America/North_Dakota/Beulah    |               |
| America/North_Dakota/Center    |               |
| America/North_Dakota/New_Salem |               |
| America/Nuuk                   |               |
| America/Ojinaga                |               |
| America/Panama                 |               |
| America/Pangnirtung            |               |
| America/Paramaribo             |               |
| America/Phoenix                | MST           |
| America/Port-au-Prince         |               |
| America/Port_of_Spain          |               |
| America/Porto_Velho            |               |
| America/Puerto_Rico            |               |
| America/Punta_Arenas           |               |
| America/Rainy_River            |               |
| America/Rankin_Inlet           |               |
| America/Recife                 |               |
| America/Regina                 |               |
| America/Resolute               |               |
| America/Rio_Branco             |               |
| America/Santa_Isabel           |               |
| America/Santarem               |               |
| America/Santiago               | CLST, CLT     |
| America/Santo_Domingo          |               |
| America/Sao_Paulo              | BRST, BRT     |
| America/Scoresbysund           |               |
| America/Shiprock               |               |
| America/Sitka                  |               |
| America/St_Barthelemy          |               |
| America/St_Johns               | NDT, NST      |
| America/St_Kitts               |               |
| America/St_Lucia               |               |
| America/St_Thomas              |               |
| America/St_Vincent             |               |
| America/Swift_Current          |               |
| America/Tegucigalpa            |               |
| America/Thule                  |               |
| America/Thunder_Bay            |               |
| America/Tijuana                |               |
| America/Toronto                |               |
| America/Tortola                |               |
| America/Vancouver              |               |
| America/Whitehorse             |               |
| America/Winnipeg               |               |
| America/Yakutat                |               |
| America/Yellowknife            |               |
| Antarctica/Casey               |               |
| Antarctica/Davis               |               |
| Antarctica/DumontDUrville      |               |
| Antarctica/Macquarie           |               |
| Antarctica/Mawson              |               |
| Antarctica/McMurdo             |               |
| Antarctica/Palmer              |               |
| Antarctica/Rothera             |               |
| Antarctica/South_Pole          |               |
| Antarctica/Syowa               |               |
| Antarctica/Troll               |               |
| Antarctica/Vostok              |               |
| Arctic/Longyearbyen            |               |
| Asia/Aden                      |               |
| Asia/Almaty                    |               |
| Asia/Amman                     |               |
| Asia/Anadyr                    |               |
| Asia/Aqtau                     |               |
| Asia/Aqtobe                    |               |
| Asia/Ashgabat                  |               |
| Asia/Atyrau                    |               |
| Asia/Baghdad                   |               |
| Asia/Bahrain                   |               |
| Asia/Baku                      |               |
| Asia/Bangkok                   | ICT           |
| Asia/Barnaul                   |               |
| Asia/Beirut                    |               |
| Asia/Bishkek                   |               |
| Asia/Brunei                    |               |
| Asia/Calcutta                  |               |
| Asia/Chita                     |               |
| Asia/Choibalsan                |               |
| Asia/Chongqing                 |               |
| Asia/Colombo                   |               |
| Asia/Damascus                  |               |
| Asia/Dhaka                     | BDT           |
| Asia/Dili                      |               |
| Asia/Dubai                     | GST           |
| Asia/Dushanbe                  |               |
| Asia/Famagusta                 |               |
| Asia/Gaza                      |               |
| Asia/Harbin                    |               |
| Asia/Hebron                    |               |
| Asia/Ho_Chi_Minh               |               |
| Asia/Hong_Kong                 | HKT           |
| Asia/Hovd                      |               |
| Asia/Irkutsk                   |               |
| Asia/Jakarta                   | WIT           |
| Asia/Jayapura                  |               |
| Asia/Jerusalem                 |               |
| Asia/Kabul                     |               |
| Asia/Kamchatka                 |               |
| Asia/Karachi                   | PKT           |
| Asia/Kashgar                   |               |
| Asia/Kathmandu                 |               |
| Asia/Katmandu                  |               |
| Asia/Khandyga                  |               |
| Asia/Krasnoyarsk               |               |
| Asia/Kuala_Lumpur              |               |
| Asia/Kuching                   |               |
| Asia/Kuwait                    |               |
| Asia/Macau                     |               |
| Asia/Magadan                   |               |
| Asia/Makassar                  |               |
| Asia/Manila                    | PHT           |
| Asia/Muscat                    |               |
| Asia/Nicosia                   |               |
| Asia/Novokuznetsk              |               |
| Asia/Novosibirsk               |               |
| Asia/Omsk                      |               |
| Asia/Oral                      |               |
| Asia/Phnom_Penh                |               |
| Asia/Pontianak                 |               |
| Asia/Pyongyang                 |               |
| Asia/Qatar                     |               |
| Asia/Qostanay                  |               |
| Asia/Qyzylorda                 |               |
| Asia/Rangoon                   |               |
| Asia/Riyadh                    |               |
| Asia/Sakhalin                  |               |
| Asia/Samarkand                 |               |
| Asia/Seoul                     | KST           |
| Asia/Shanghai                  |               |
| Asia/Singapore                 | SGT           |
| Asia/Srednekolymsk             |               |
| Asia/Taipei                    |               |
| Asia/Tashkent                  |               |
| Asia/Tbilisi                   |               |
| Asia/Tehran                    | IRST          |
| Asia/Thimphu                   |               |
| Asia/Tokyo                     | JST           |
| Asia/Tomsk                     |               |
| Asia/Ulaanbaatar               |               |
| Asia/Urumqi                    |               |
| Asia/Ust-Nera                  |               |
| Asia/Vientiane                 |               |
| Asia/Vladivostok               |               |
| Asia/Yakutsk                   |               |
| Asia/Yangon                    |               |
| Asia/Yekaterinburg             |               |
| Asia/Yerevan                   |               |
| Atlantic/Azores                |               |
| Atlantic/Bermuda               |               |
| Atlantic/Canary                |               |
| Atlantic/Cape_Verde            |               |
| Atlantic/Faroe                 |               |
| Atlantic/Madeira               |               |
| Atlantic/Reykjavik             |               |
| Atlantic/South_Georgia         |               |
| Atlantic/St_Helena             |               |
| Atlantic/Stanley               |               |
| Australia/Adelaide             |               |
| Australia/Brisbane             |               |
| Australia/Broken_Hill          |               |
| Australia/Currie               |               |
| Australia/Darwin               |               |
| Australia/Eucla                |               |
| Australia/Hobart               |               |
| Australia/Lindeman             |               |
| Australia/Lord_Howe            |               |
| Australia/Melbourne            |               |
| Australia/Perth                |               |
| Australia/Sydney               |               |
| Europe/Amsterdam               |               |
| Europe/Andorra                 |               |
| Europe/Astrakhan               |               |
| Europe/Athens                  | EEST, EET     |
| Europe/Belgrade                |               |
| Europe/Berlin                  |               |
| Europe/Bratislava              |               |
| Europe/Brussels                |               |
| Europe/Bucharest               |               |
| Europe/Budapest                |               |
| Europe/Busingen                |               |
| Europe/Chisinau                |               |
| Europe/Copenhagen              |               |
| Europe/Dublin                  |               |
| Europe/Gibraltar               |               |
| Europe/Guernsey                |               |
| Europe/Helsinki                |               |
| Europe/Isle_of_Man             |               |
| Europe/Istanbul                | TRT           |
| Europe/Jersey                  |               |
| Europe/Kaliningrad             |               |
| Europe/Kiev                    |               |
| Europe/Kirov                   |               |
| Europe/Lisbon                  | WEST, WET     |
| Europe/Ljubljana               |               |
| Europe/London                  | BST           |
| Europe/Luxembourg              |               |
| Europe/Madrid                  |               |
| Europe/Malta                   |               |
| Europe/Mariehamn               |               |
| Europe/Minsk                   |               |
| Europe/Monaco                  |               |
| Europe/Moscow                  | MSD, MSK      |
| Europe/Oslo                    |               |
| Europe/Paris                   | CEST, CET     |
| Europe/Podgorica               |               |
| Europe/Prague                  |               |
| Europe/Riga                    |               |
| Europe/Rome                    |               |
| Europe/Samara                  |               |
| Europe/San_Marino              |               |
| Europe/Sarajevo                |               |
| Europe/Saratov                 |               |
| Europe/Simferopol              |               |
| Europe/Skopje                  |               |
| Europe/Sofia                   |               |
| Europe/Stockholm               |               |
| Europe/Tallinn                 |               |
| Europe/Tirane                  |               |
| Europe/Ulyanovsk               |               |
| Europe/Uzhgorod                |               |
| Europe/Vaduz                   |               |
| Europe/Vatican                 |               |
| Europe/Vienna                  |               |
| Europe/Vilnius                 |               |
| Europe/Volgograd               |               |
| Europe/Warsaw                  |               |
| Europe/Zagreb                  |               |
| Europe/Zaporozhye              |               |
| Europe/Zurich                  |               |
| GMT                            | GMT           |
| Indian/Antananarivo            |               |
| Indian/Chagos                  |               |
| Indian/Christmas               |               |
| Indian/Cocos                   |               |
| Indian/Comoro                  |               |
| Indian/Kerguelen               |               |
| Indian/Mahe                    |               |
| Indian/Maldives                |               |
| Indian/Mauritius               |               |
| Indian/Mayotte                 |               |
| Indian/Reunion                 |               |
| Pacific/Apia                   |               |
| Pacific/Auckland               | NZDT, NZST    |
| Pacific/Bougainville           |               |
| Pacific/Chatham                |               |
| Pacific/Chuuk                  |               |
| Pacific/Easter                 |               |
| Pacific/Efate                  |               |
| Pacific/Enderbury              |               |
| Pacific/Fakaofo                |               |
| Pacific/Fiji                   |               |
| Pacific/Funafuti               |               |
| Pacific/Galapagos              |               |
| Pacific/Gambier                |               |
| Pacific/Guadalcanal            |               |
| Pacific/Guam                   |               |
| Pacific/Honolulu               | HST           |
| Pacific/Johnston               |               |
| Pacific/Kanton                 |               |
| Pacific/Kiritimati             |               |
| Pacific/Kosrae                 |               |
| Pacific/Kwajalein              |               |
| Pacific/Majuro                 |               |
| Pacific/Marquesas              |               |
| Pacific/Midway                 |               |
| Pacific/Nauru                  |               |
| Pacific/Niue                   |               |
| Pacific/Norfolk                |               |
| Pacific/Noumea                 |               |
| Pacific/Pago_Pago              |               |
| Pacific/Palau                  |               |
| Pacific/Pitcairn               |               |
| Pacific/Pohnpei                |               |
| Pacific/Ponape                 |               |
| Pacific/Port_Moresby           |               |
| Pacific/Rarotonga              |               |
| Pacific/Saipan                 |               |
| Pacific/Tahiti                 |               |
| Pacific/Tarawa                 |               |
| Pacific/Tongatapu              |               |
| Pacific/Truk                   |               |
| Pacific/Wake                   |               |
| Pacific/Wallis                 |               |

The code to output this table:

```swift
import Foundation

for identifier in TimeZone.knownTimeZoneIdentifiers.sorted() {
    let abbreviations = TimeZone.abbreviationDictionary.filter { (k, v) in
        v == identifier
    }
    print("| \(identifier) | \(abbreviations.keys.sorted().joined(separator: ", ")) |")
}
```

[1]: https://stackoverflow.com/a/71312395/455016
[2]: https://www.statium.app/newsletter
