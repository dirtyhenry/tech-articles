import { createPopper, detectOverflow } from "@popperjs/core";

const createButton = () => {
  const button = document.createElement("button");
  button.setAttribute("aria-describedby", "tooltip");
  button.setAttribute("class", "tooltip-btn");

  const span = document.createElement("span");
  span.textContent = "⋯";

  button.appendChild(span);

  return button;
};

const createArrow = () => {
  const arrow = document.createElement("div");
  arrow.setAttribute("class", "arrow");
  arrow.setAttribute("data-popper-arrow", true);
  return arrow;
};

const createTooltip = (oldParent) => {
  const div = document.createElement("div");
  div.setAttribute("role", "tooltip");
  div.setAttribute("class", "tooltip");
  while (oldParent.childNodes.length > 0) {
    div.appendChild(oldParent.firstChild);
  }

  div.querySelector('[class="footnote-backref"]')?.remove();
  div.appendChild(createArrow());

  return div;
};

document.addEventListener("DOMContentLoaded", (event) => {
  // Footnote references look like:
  //
  // ```
  // <sup class="footnote-ref">
  //   <a id="fnref1" href="#fn1">1</a>
  // </sup>
  // ```
  //
  // Footnotes look like:
  //
  // ```
  // <section class="footnotes">
  //   <ol>
  //     <li id="fn1">
  //       <p>If you can think of one, let me know. <a href="#fnref1" class="footnote-backref">↩</a></p>
  //     </li>
  //     ...
  //   </ol>
  // </section>

  document.querySelectorAll("sup.footnote-ref").forEach((footnoteReference) => {
    // referenceName is the selector of the reference, ie "#fn1", "#fn2", etc.
    const referenceName = footnoteReference.firstChild.getAttribute("href");

    const footnote = document.querySelector(referenceName);

    const button = createButton();
    const tooltip = createTooltip(footnote);
    footnoteReference.replaceWith(button, tooltip);

    const popperInstance = createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    const toggle = (e) => {
      e.stopPropagation();

      if (tooltip.hasAttribute("data-show")) {
        tooltip.removeAttribute("data-show");
      } else {
        tooltip.setAttribute("data-show", "");

        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        popperInstance.update();
      }
    };

    const toggleEvents = ["touchstart", "click"];

    toggleEvents.forEach((event) => {
      button.addEventListener(event, toggle);
    });
  });

  document.querySelector('section[class="footnotes"]')?.remove();

  document.body.addEventListener("click", (e) => {
    document.querySelectorAll('div[role="tooltip"]').forEach((t) => {
      t.removeAttribute("data-show");
    });
  });
});
