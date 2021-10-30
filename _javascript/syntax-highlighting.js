import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import js from "highlight.js/lib/languages/javascript";
import objc from "highlight.js/lib/languages/objectivec";
import shell from "highlight.js/lib/languages/shell";
import swift from "highlight.js/lib/languages/swift";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("java", java);
hljs.registerLanguage("js", js);
hljs.registerLanguage("objc", objc);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightBlock(block);
  });
});
