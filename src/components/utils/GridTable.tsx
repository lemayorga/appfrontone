import React,{ useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { ColumnType, TableProps } from 'antd/lib/table';
import  Constants from '../../types/Constants';
 

  function CustomTable<RecordType extends object = any>(props: TableProps<RecordType>){

  const {columns, dataSource } = props;
  
  const [searchText,setSearchText] = useState<string>('');
  const [searchedColumn,setSearchedColumn] = useState<string>('');

  const handleSearch = (selectedKeys: any, confirm:any, dataIndex:any) => {
    console.log(typeof(selectedKeys));
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    console.log(typeof(clearFilters));
    clearFilters();
    setSearchText('');
  };

  const searchInput: { current: Input | null } = { current: null };

    const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any): JSX.Element => (
      <div style={{ padding: 8 }}>
        <Input
          ref={ searchInput }
          placeholder={`${Constants.TEXT_SEARCH} ${dataIndex}`}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value:any , record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

 
  const columnsTable = (columns || []).map((col, index) => {       
    var newCol: ColumnType<RecordType> = col;
    newCol.key = newCol.dataIndex!.toString();
    newCol.title = (col.title || '')?.toString()?.charAt(0)?.toUpperCase() + (col.title || '').toString()?.slice(1);

    if(!col.sorter){
      newCol.sorter = true;
      newCol.sortDirections = ['descend','ascend'];
      newCol.ellipsis= true;
      newCol.sorter = (rowA:any, rowB:any) => rowA[newCol.dataIndex!.toString()].length  - rowB[newCol.dataIndex!.toString()].length;
    }

    if(!col.render){
      return {
        ...newCol,                
        ...getColumnSearchProps(newCol.dataIndex!.toString())
      }
    }
    else{
      return {
        ...newCol,
      }
    }
  });



  let rowKey:string = columnsTable[0].key!.toString() || 'rowKey';

  return (
    <Table columns={columnsTable} dataSource={dataSource || []} rowKey={rowKey} />
   )
 }


 export default CustomTable;



 /*
 https://stackoverflow.com/questions/54683953/filter-list-based-on-input-field-in-react-using-search-regular-expression
 https://stackoverflow.com/questions/62040193/and-design-table-typescript-getcolumnsearchprops-example
 https://stackoverflow.com/questions/66089239/antd-filter-dropdown-doesnt-render-in-react-typescript
 https://stackoverflow.com/questions/66963268/typing-react-props-returns-errors
 
 */