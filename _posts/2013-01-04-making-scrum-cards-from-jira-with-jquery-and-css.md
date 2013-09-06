---
layout: default
title: Making Scrum Cards from Jira with jQuery and CSS
---

# Making Scrum Cards from Jira with jQuery and CSS

<p class="lead">
  Sometimes you run out of Post-Its. Shit happens. Let's keep the task board busy anyway...
</p>

It happened to me in real-life. We just agreed on our Sprint backlog and are willing to display it proudly on our walls but... there's no Post-Its left. What are your options then?

- you can just run to the local store... Sure but come on. This chair is comfortable.
- you can find a plugin for your bug-tracker (let's just assume you're using Jira too, ok?) like [this one](https://marketplace.atlassian.com/plugins/com.spartez.scrumprint.scrumplugin) but what if you're using the "OnDemand" version?

Well, then Jira's export functions and some basic jQuery and CSS can help.

## Jira export

In the "Issues" tab, select your filter, and then "Views" and "Excel (Current Fields)". Wait what?! We're going to use Excel?! Hell no. Keep calm and carry on. This kind of export is just a HTML file. Weird but kind of convenient. Rename this file with a <code>.html</code> extension, open it in a browser and a text editor: the magic is about to open.

## The Magic of jQuery and CSS

Head to [this GitHub repo](https://github.com/dirtyhenry/jira-to-agile-cards), copy the two files included in the same directory where you have your .html file and add the following 2 lines at the end of your Jira export:

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="jira.js"></script>
    
And refresh your HTML page. Tada!

![The beautiful result: a scrum board with pretty yellow scrum cards](../assets/img/scrum_board.png "The beautiful final result")

## Troubleshooting

If the "tada" moment is more of a "nothing happened" moment, check out your JavaScript console: it's most likely a jQuery download failure. In which case, download jQuery and change the above script to include a local version of jQuery.

If it's still not working, try to get some context and yell at me [here](https://github.com/dirtyhenry/jira-to-agile-cards/issues).

Full disclosure: other solutions could be:

- [Agile Cards for JIRA plugin by Spartez](https://marketplace.atlassian.com/plugins/com.spartez.scrumprint.scrumplugin) but you won't be able to get it if you run the OnDemand version of Jira
- [This Java code](http://blog.insane-development.org/?p=25) by insane-development.org
- [This open-source Ruby gem](https://github.com/jhollingworth/jira-cards) by jhollingworth

<a href="https://github.com/dirtyhenry/jira-to-agile-cards"><img style="position: fixed; top: 0; right: 0; border: 0; z-index:2000;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>