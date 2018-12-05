import { shallowMount } from '@vue/test-utils'
import Menu from '../components/index/menu.vue'

describe('menu.vue', () => {
  before(function() {
    this.jsdom = require('jsdom-global')()
  })

  after(function() {
    this.jsdom()
  })
  it('计数器在点击按钮时自增', () => {
    const wrapper = mount(Menu)
    const vm = wrapper.vm
    fakeSubmenu = [
      {
        title: '筆電',
        child: ['Apple', 'ASUS', 'Lenvono', 'Microsoft', 'Dell']
      },
      {
        title: '平板',
        child: ['Apple', 'ASUS', 'SAMSUNG', 'Acer', 'HUAWEI']
      },
      {
        title: '手機',
        child: ['Apple', 'ASUS', '小米', 'HTC', 'SAMSUNG']
      }
    ]
    vm.addSubmenu(fakeSubmenu)
    print(submenu)
    let expect = chai.expect
    expect(vm.submenu).to.equal(fakeSubmenu)
  })
})
