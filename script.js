let images = [];

// 读取 images.json 文件
fetch("images.json")
    .then(response => response.json()) // 解析 JSON
    .then(data => {
        images = data;
        displayImages(images); // 显示图片
    })
    .catch(error => console.error("加载 JSON 失败:", error));

// 显示图片
function displayImages(imageList) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // 清空当前的图片展示

    imageList.forEach(img => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-item");

        const imgElement = document.createElement("img");
        imgElement.src = img.url;
        imgElement.alt = img.text; // 设置 alt 属性为图片描述
        imageContainer.appendChild(imgElement);

        // 设置图片的最大宽度为 200px
        imgElement.style.maxWidth = "200px";  // 通过 JavaScript 设置最大宽度
        imgElement.style.width = "100%";      // 让图片自适应容器宽度

        // 设置图片容器的宽度和其他样式
        imageContainer.style.textAlign = "center";  // 图片居中显示
        imageContainer.style.display = "block";

        // 添加文字描述
        const caption = document.createElement("p");
        caption.textContent = img.text;
        caption.style.marginTop = "10px";  // 文字与图片间隔
        caption.style.fontSize = "16px";
        caption.style.color = "#555";
        imageContainer.appendChild(caption);

        gallery.appendChild(imageContainer);
    });
}

// 搜索图片
function searchImages() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    // 过滤符合关键词的图片
    const filteredImages = images.filter(img => 
        img.keywords.some(kw => kw.toLowerCase().includes(query))
    );

    // 显示匹配的图片
    displayImages(filteredImages);
}

// 页面加载时显示所有图片
document.addEventListener("DOMContentLoaded", () => {
    // 确保图片数据加载完成后再调用 displayImages
    if (images.length > 0) {
        displayImages(images);
    }

    // 监听输入框的变化，实时搜索
    document.getElementById("searchInput").addEventListener("input", searchImages);
});
