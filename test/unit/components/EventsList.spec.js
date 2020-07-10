import { createLocalVue, shallowMount } from '@vue/test-utils'
import EventsList from '@/components/EventsList'

const localVue = createLocalVue()
const events = [
  { date: '2020-07-07', title: 'Party' },
  { date: '2020-07-08', title: 'Concert' }
]

describe('<EventsList/>', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(EventsList, {
      localVue,
      propsData: {
        showAllEvents: true
      },
      data: () => {
        return {
          eventsList: events
        }
      }
    })
  })

  test('should load events list', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.vm.isEmptyScreen).toBeFalsy()
  })

  test('should load empty list', async () => {
    await wrapper.setData({ eventsList: [] })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.vm.isEmptyScreen).toBeTruthy()
  })

  test('should NOT load SortBy components', async () => {
    await wrapper.setProps({ showAllEvents: false })
    expect(wrapper.find('[data-sort-events]').exists()).toBeFalsy()
  })

  test('should show pagination', async () => {
    await wrapper.setData({ totalPages: 3 })
    expect(wrapper.vm.showPagination).toBeTruthy()
  })
})
