

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("[data-page]");

function showPage(pageId) {
  const selectedPage = document.getElementById(pageId);

  if (!selectedPage) {
    return;
  }

  pages.forEach(function (page) {
    page.classList.remove("active");
  });

  selectedPage.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(function (button) {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });
}

navButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    showPage(button.dataset.page);
  });
});



const productButtons = document.querySelectorAll(".order-product");
const buyerProduct = document.getElementById("buyerProduct");

productButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productName = button.dataset.product;

    if (buyerProduct) {
      buyerProduct.value = productName;
    }

    showPage("order");
  });
});



const batcheeOrderForm = document.getElementById("batcheeOrderForm");

if (batcheeOrderForm) {
  batcheeOrderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("buyerName").value.trim();
    const contact = document.getElementById("buyerContact").value.trim();
    const productSelect = document.getElementById("buyerProduct");
    const product = productSelect.value;

    const quantity = Number(
      document.getElementById("buyerQuantity").value
    );

    const option = document.getElementById("buyerOption").value;
    const notes = document.getElementById("buyerNotes").value.trim();

    const selectedOption =
      productSelect.options[productSelect.selectedIndex];

    const price = Number(selectedOption.dataset.price);
    const total = price * quantity;

    if (!name || !contact || !product || !option || quantity < 1) {
      document.getElementById("batcheeOrderResult").textContent =
        "Please complete all required fields.";
      return;
    }

    const orderMessage =
      "HELLO BATCHEE BITES! I WOULD LIKE TO PLACE AN ORDER.\n\n" +
      "Customer Name: " + name + "\n" +
      "Contact Number: " + contact + "\n" +
      "Product: " + product + "\n" +
      "Price per serving: ₱" + price.toFixed(2) + "\n" +
      "Quantity: " + quantity + "\n" +
      "Preferred Option: " + option + "\n" +
      "Estimated Total: ₱" + total.toFixed(2) + "\n" +
      "Additional Notes: " + (notes || "None");

    const result = document.getElementById("batcheeOrderResult");

    
    result.textContent = orderMessage;
    result.style.whiteSpace = "pre-line";

    let copyButton = document.getElementById("copyOrderButton");

    if (!copyButton) {
      copyButton = document.createElement("button");
      copyButton.id = "copyOrderButton";
      copyButton.type = "button";
      copyButton.className = "secondary-btn";
      copyButton.textContent = "Copy Order Details";

      result.insertAdjacentElement("afterend", copyButton);
    }

    
copyButton.onclick = async function () {
  try {
    await navigator.clipboard.writeText(orderMessage);
  } catch (error) {
    const temporaryText = document.createElement("textarea");
    temporaryText.value = orderMessage;
    document.body.appendChild(temporaryText);
    temporaryText.select();
    document.execCommand("copy");
    temporaryText.remove();
  }

  copyButton.textContent = "Order Details Copied!";

  let facebookButton = document.getElementById("facebookOrderButton");

  if (!facebookButton) {
    facebookButton = document.createElement("a");
    facebookButton.id = "facebookOrderButton";
    facebookButton.className = "primary-btn";
    facebookButton.textContent = "Continue to Facebook ↗";
    facebookButton.target = "_blank";
    facebookButton.rel = "noopener noreferrer";

   
    facebookButton.href = "https://www.facebook.com/profile.php?id=61594535906443";

    copyButton.insertAdjacentElement("afterend", facebookButton);
  }
};
});
}

const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("feedbackName").value.trim();
    const rating = document.getElementById("feedbackRating").value;
    const message = document.getElementById("feedbackMessage").value.trim();

    document.getElementById("feedbackResult").textContent =
      "Thank you, " + name + "! Your " + rating +
      " feedback has been received on this page.";

    feedbackForm.reset();
  });
}

showPage("home");
