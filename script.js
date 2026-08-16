document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const productName =
      data.get("productName") ||
      data.get("name") ||
      "My Product";

    const productPrice =
      data.get("productPrice") ||
      data.get("price") ||
      "0";

    const productDescription =
      data.get("productDescription") ||
      data.get("description") ||
      "A great product.";

    const storeName =
      data.get("storeName") ||
      "My Store";

    const imageInput = form.querySelector('input[type="file"]');

    let imageUrl = "";

    if (imageInput && imageInput.files.length > 0) {
      imageUrl = URL.createObjectURL(imageInput.files[0]);
    }

    const oldPreview = document.querySelector("#store-preview");

    if (oldPreview) {
      oldPreview.remove();
    }

    const preview = document.createElement("div");

    preview.id = "store-preview";

    preview.innerHTML = `
      <div style="
        max-width: 900px;
        margin: 50px auto;
        padding: 30px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        text-align: center;
      ">

        <h2 style="font-size: 36px; margin-bottom: 10px;">
          ${escapeHTML(storeName)}
        </h2>

        ${
          imageUrl
            ? `<img
                src="${imageUrl}"
                alt="${escapeHTML(productName)}"
                style="
                  width: 100%;
                  max-width: 500px;
                  max-height: 500px;
                  object-fit: contain;
                  border-radius: 15px;
                  margin: 20px auto;
                "
              >`
            : ""
        }

        <h3 style="font-size: 30px; margin-top: 20px;">
          ${escapeHTML(productName)}
        </h3>

        <p style="
          font-size: 18px;
          color: #555;
          margin: 15px auto;
          max-width: 600px;
        ">
          ${escapeHTML(productDescription)}
        </p>

        <strong style="
          display: block;
          font-size: 28px;
          margin: 20px;
        ">
          $${escapeHTML(productPrice)}
        </strong>

        <button
          style="
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            background: #111;
            color: white;
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
          "
          onclick="alert('Your store is ready!')"
        >
          Buy Now
        </button>

      </div>
    `;

    document.body.appendChild(preview);

    preview.scrollIntoView({
      behavior: "smooth"
    });
  });
});


function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
