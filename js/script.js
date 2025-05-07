document.addEventListener("DOMContentLoaded", () => {
  // 导航栏样式
  const navbar = document.querySelector(".navbar")

  // 初始化导航栏状态 - 首页不隐藏
  setTimeout(() => {
    navbar.classList.add("visible")
  }, 100)

  // 通知气泡
  const telegramLinks = document.querySelectorAll(".telegram-link")
  const notificationBubble = document.getElementById("notification-bubble")

  telegramLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      // 设置通知内容
      notificationBubble.textContent = "Telegram频道暂未开放！"

      // 显示通知
      notificationBubble.classList.add("show")

      // 3秒后隐藏通知
      setTimeout(() => {
        notificationBubble.classList.remove("show")
      }, 3000)
    })
  })

  // 在移动设备上处理下拉菜单
  if (window.innerWidth <= 768) {
    const dropdowns = document.querySelectorAll(".dropdown")

    dropdowns.forEach((dropdown) => {
      const dropdownLink = dropdown.querySelector("a")

      dropdownLink.addEventListener("click", (e) => {
        // 不阻止默认行为，允许链接跳转

        // 关闭其他打开的下拉菜单
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown && otherDropdown.classList.contains("active")) {
            otherDropdown.classList.remove("active")
          }
        })

        // 切换当前下拉菜单的状态
        dropdown.classList.toggle("active")
      })
    })

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active")
        })
      }
    })
  }

  // 处理公告分页
  const pageBtns = document.querySelectorAll(".page-btn")
  const announcementPages = document.querySelectorAll(".announcement-page")

  pageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPage = btn.getAttribute("data-target")

      // 更新按钮状态
      pageBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // 更新页面显示
      announcementPages.forEach((page) => {
        page.classList.remove("active")
        if (page.getAttribute("data-page") === targetPage) {
          page.classList.add("active")
        }
      })
    })
  })

  // 管理组名单点击事件
  const adminList = document.querySelector(".admin-list")
  if (adminList) {
    adminList.addEventListener("click", () => {
      window.location.href = "ops.html"
    })
  }

  // 复制IP到剪贴板
  const copyButtons = document.querySelectorAll(".copy-btn")

  copyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const textToCopy = button.getAttribute("data-clipboard-text")

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // 显示复制成功提示
          const originalText = button.textContent
          button.textContent = "已复制!"
          button.style.backgroundColor = "#4CAF50"

          // 设置通知内容
          notificationBubble.textContent = "已复制到剪贴板！"

          // 显示全局通知
          notificationBubble.classList.add("show")

          setTimeout(() => {
            notificationBubble.classList.remove("show")
            button.textContent = originalText
            button.style.backgroundColor = "#2e8b57"
          }, 1500)
        })
        .catch((err) => {
          console.error("复制失败: ", err)
        })
    })
  })

  // 随机壁纸加载
  const wallpaperBlock = document.getElementById("wallpaper-block")
  const wallpapers = ["wallpaper1.jpg", "wallpaper2.jpg", "wallpaper3.jpg", "wallpaper4.jpg", "wallpaper5.jpg"]

  // 随机选择一张壁纸
  const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)]
  const wallpaperImg = document.createElement("img")
  wallpaperImg.src = `images/wallpapers/${randomWallpaper}`
  wallpaperImg.alt = "随机壁纸"
  wallpaperImg.id = "current-wallpaper"
  wallpaperBlock.appendChild(wallpaperImg)

  // 壁纸下载菜单
  const wallpaperMenu = document.getElementById("wallpaper-menu")
  const wallpaperControls = document.getElementById("wallpaper-controls")
  const currentWallpaperName = randomWallpaper

  // 右键菜单
  wallpaperBlock.addEventListener("contextmenu", (e) => {
    e.preventDefault()

    // 显示右键菜单
    wallpaperMenu.style.display = "block"
    wallpaperMenu.style.left = `${e.pageX}px`
    wallpaperMenu.style.top = `${e.pageY}px`
  })

  // 左键点击下载控件
  wallpaperControls.addEventListener("click", (e) => {
    e.stopPropagation()

    // 显示下载菜单
    const rect = wallpaperControls.getBoundingClientRect()
    wallpaperMenu.style.display = "block"
    wallpaperMenu.style.left = `${rect.left}px`
    wallpaperMenu.style.top = `${rect.bottom + window.scrollY}px`
  })

  // 点击页面其他地方关闭菜单
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#wallpaper-menu") && !e.target.closest("#wallpaper-controls")) {
      wallpaperMenu.style.display = "none"
    }
  })

  // 处理下载选项
  const downloadOptions = wallpaperMenu.querySelectorAll("li")
  downloadOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const resolution = option.getAttribute("data-resolution")
      downloadWallpaper(currentWallpaperName, resolution)
      wallpaperMenu.style.display = "none"
    })
  })

  // 下载壁纸函数
  function downloadWallpaper(wallpaperName, resolution) {
    // 在实际应用中，这里应该根据分辨率获取不同的文件
    // 这里为了演示，我们使用相同的文件名但添加分辨率后缀
    const baseName = wallpaperName.split(".")[0]
    const extension = wallpaperName.split(".")[1]
    const downloadName = `${baseName}_${resolution}.${extension}`

    // 创建一个下载链接
    const link = document.createElement("a")
    link.href = `images/wallpapers/${wallpaperName}` // 实际应用中应该是不同分辨率的文件
    link.download = downloadName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 显示下载提示
    notificationBubble.textContent = `正在下载 ${resolution} 分辨率的壁纸`
    notificationBubble.classList.add("show")

    setTimeout(() => {
      notificationBubble.classList.remove("show")
    }, 3000)
  }
})
