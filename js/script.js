document.addEventListener("DOMContentLoaded", () => {
  // 在移动设备上处理下拉菜单
  if (window.innerWidth <= 768) {
    const dropdowns = document.querySelectorAll(".dropdown")

    dropdowns.forEach((dropdown) => {
      const dropdownLink = dropdown.querySelector("a")

      dropdownLink.addEventListener("click", (e) => {
        e.preventDefault()

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

  // 视频播放按钮点击事件
  const playButton = document.querySelector(".play-button")
  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("视频播放功能将在实际环境中启用")
    })
  }

  // 导航栏滚动效果
  let lastScrollTop = 0
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 向下滚动
      navbar.style.transform = "translateY(-100%)"
    } else {
      // 向上滚动
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })
})
