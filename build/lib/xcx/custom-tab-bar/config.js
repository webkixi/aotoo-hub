export function config(params) {
  return defaultAsset(params)
}

function defaultAsset(params) {
  return {
    show: false,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    itemClass: '', // 补充tab-bar的额外class
    list: [{
        pagePath: "/pages/modal/index",
        iconPath: "/images/icon_component.png",
        selectedIconPath: "/images/icon_component_HL.png",
        text: "组件",
        reddot: '0',
        show: true
      },
      {
        pagePath: "/pages/empty/index",
        iconPath: "/images/icon_API.png",
        selectedIconPath: "/images/icon_API_HL.png",
        text: "接口",
        reddot: '0',
        show: true
      }
    ]
  }
}