---
layout: post
title: Rails Cheat Sheet
excerpt: >-
  A quick reference of my go-to Rails gems.
---

## Useful Commands

- `rails new depot`
- Reset the database: `rake db:reset && rake db:migrate`

## Useful Gems

- Authentication: [devise][1]
- File Uploads: [carrierwave][2], [paperclip][3]
- Cloud Storage: [fog][4]
- Background Tasks: [Sidekiq][5], [delayed_job][6]

[1]: https://github.com/heartcombo/devise
[2]: https://github.com/carrierwaveuploader/carrierwave
[3]: https://github.com/thoughtbot/paperclip
[4]: https://github.com/fog/fog
[5]: https://sidekiq.org/
[6]: https://github.com/collectiveidea/delayed_job
