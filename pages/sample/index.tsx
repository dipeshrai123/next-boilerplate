import {Button} from 'common/button'
import {Toast, useToast} from 'common/toast'
import {Modal} from 'common/modal'
import {Dropdown} from 'common/dropdown'
import {Menu, MenuItem, MenuSeparator} from 'common/menu'
import {HStack, VStack, ResponsiveStack} from 'common/stack'
import {Tabs, TabsPane, useTabsRef} from 'common/tabs'
import {Tooltip} from 'common/tooltip'
import {Table} from 'common/table'
import {Skeleton} from 'common/skeleton'

const Sample = () => {
  const {handler, toast} = useToast()
  const tabsRef = useTabsRef()

  return (
    <>
      <h2>Skeleton</h2>
      <Skeleton width={100} height={100} />

      <h2>Table</h2>
      <TableComponent />

      <h2>Tooltip</h2>
      <HStack gap="$2" wrap>
        <Tooltip title="tooltip title" placement="bottomleft">
          <Button color="primary">BOTTOM LEFT</Button>
        </Tooltip>
        <Tooltip title="tooltip title" placement="bottommiddle">
          <Button color="primary">BOTTOM MIDDLE</Button>
        </Tooltip>
        <Tooltip title="tooltip title" placement="bottomright">
          <Button color="primary">BOTTOM RIGHT</Button>
        </Tooltip>
        <Tooltip title="tooltip title" placement="topleft">
          <Button color="primary">TOP LEFT</Button>
        </Tooltip>
        <Tooltip title="tooltip title" placement="topmiddle">
          <Button color="primary">TOP MIDDLE</Button>
        </Tooltip>
        <Tooltip title="tooltip title" placement="topright">
          <Button color="primary">TOP RIGHT</Button>
        </Tooltip>
      </HStack>

      <h2>Toast</h2>
      <Button color="success" onClick={() => toast.success('Some message')}>
        Open Toast
      </Button>

      <h2>Modal</h2>
      <Modal
        trigger={() => <Button color="primary">OPEN MODAL</Button>}
        closeOnOverlayClick={false}
      >
        {(modal) => (
          <div>
            CONTENT GOES HERE
            <Button color="error" onClick={() => modal.close()}>
              CLOSE
            </Button>
          </div>
        )}
      </Modal>

      <h2>Menu</h2>
      <Menu trigger={() => <Button color="secondary">Open Menu</Button>}>
        <MenuItem onClick={() => false}>First Element</MenuItem>
        <MenuItem onClick={() => false}>Second Element</MenuItem>
        <MenuSeparator />
        <MenuItem onClick={() => false} danger>
          Third Element
        </MenuItem>
      </Menu>

      <h2>Dropdown</h2>
      <Dropdown
        triggerToggle
        trigger={() => <Button>Open Custom Dropdown</Button>}
      >
        <div
          style={{
            width: 240,
            height: 140,
            backgroundColor: '#3399ff',
            borderRadius: 4
          }}
        />
      </Dropdown>

      <h2>HStack</h2>
      <HStack style={{backgroundColor: 'yellow'}}>
        <div style={{background: 'red', color: 'white'}}>HStack Item 1</div>
        <div style={{background: 'blue', color: 'white'}}>HStack Item 2</div>
        <div style={{background: 'green', color: 'white'}}>HStack Item 3</div>
      </HStack>

      <h2>VStack</h2>
      <VStack style={{backgroundColor: 'orange'}}>
        <div style={{background: 'red', color: 'white'}}>VStack Item 1</div>
        <div style={{background: 'blue', color: 'white'}}>VStack Item 2</div>
        <div style={{background: 'green', color: 'white'}}>VStack Item 3</div>
      </VStack>

      <ResponsiveStack
        style={{backgroundColor: 'yellow', padding: 2}}
        gap="$0_5"
      >
        <div style={{flex: 1, height: 200, backgroundColor: 'green'}}>
          HStack Item 1
        </div>
        <div style={{flex: 1, height: 200, backgroundColor: 'red'}}>
          HStack Item 2
        </div>
      </ResponsiveStack>

      <h2>Tabs</h2>
      <Tabs ref={tabsRef}>
        <TabsPane id="one" title="Tab One">
          Tab One Content
          <Button onClick={() => tabsRef.current?.setActiveId('two')}>
            GOTO TAB TWO
          </Button>
        </TabsPane>
        <TabsPane
          id="two"
          title={<Button color="primary">SAMPLE BUTTON TEST</Button>}
        >
          Tab Two Content
        </TabsPane>
        <TabsPane id="three" title="Tab Three">
          Tab Three Content
        </TabsPane>
      </Tabs>

      <Toast {...handler} />
    </>
  )
}

const TableComponent = () => {
  return (
    <Table
      columns={[
        {
          field: 'name',
          name: 'Name'
        },
        {
          field: 'age',
          name: 'Age',
          render: (data) => <div>{data}</div>
        },
        {
          field: 'address',
          name: 'Address',
          render: ({line1}) => <div>Address: {line1}</div>
        }
      ]}
      data={Array(5)
        .fill({
          name: 'Dipesh',
          age: 100,
          address: {
            line1: 'abc',
            line2: 'cde'
          }
        })
        .map((d) => d)}
      loading={false}
      actions={{
        onEdit: (data) => {
          console.log('EDIT', data)
        },
        onView: (data) => {
          console.log('VIEW', data)
        },
        onDelete: (data) => {
          console.log('DELETE', data)
        }
      }}
      pagination={{
        perPage: 5,
        totalCount: 20
      }}
    />
  )
}

export default Sample
