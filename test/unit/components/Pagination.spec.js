import { shallowMount } from '@vue/test-utils'
import Pagination from '@/components/Pagination'

describe('<Pagination />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Pagination)
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
