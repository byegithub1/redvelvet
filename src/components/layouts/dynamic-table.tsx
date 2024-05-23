'use client'

import Highlighter from 'react-highlight-words'

import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table } from 'antd'
import { useRef, useState, useEffect } from 'react'

type Props = {
  columns: any
  dataSource: any
  nestedColumns?: any
  nestedDataSource?: any
  primaryKey: string
  footerText: any
  cantBeSearched: any
}

function DynamicTable({
  columns,
  dataSource,
  nestedColumns,
  nestedDataSource,
  primaryKey,
  footerText,
  cantBeSearched
}: Props) {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [loading, setLoading] = useState(true)

  const searchInput: any = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (columns && dataSource && cantBeSearched) setLoading(false)
    }, 1500)
    return () => {
      //
    }
  }, [])

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: any) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(event) => event.stopPropagation()}>
        <Input
          size="small"
          ref={searchInput}
          placeholder={`Search ${dataIndex.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase())}`}
          value={selectedKeys[0]}
          onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#c20000' : undefined }} />,
    onFilter: (value: any, record: any) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100)
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#fff0de', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {},
    onSelect: (record: any, selected: any, selectedRows: any) => {},
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {}
  }

  return (
    <Table
      loading={loading}
      size="small"
      scroll={{ x: 317, y: 470 }}
      columns={columns.map((column: any) => ({
        ...column,
        ...(cantBeSearched.includes(column.dataIndex) ? {} : getColumnSearchProps(column.dataIndex))
      }))}
      dataSource={dataSource}
      pagination={{ pageSize: 10 }}
      sticky={{ offsetHeader: 0 }}
      footer={() => footerText}
    />
  )
}

export default DynamicTable
