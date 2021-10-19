import { AppstoreAddOutlined, CheckCircleOutlined, DashboardOutlined, FileTextOutlined, FormOutlined, HighlightOutlined, LayoutOutlined, LineChartOutlined, MenuOutlined, ProfileOutlined, QuestionOutlined, SmileOutlined, SwitcherOutlined, TableOutlined, TabletOutlined, UserOutlined, WarningOutlined } from "@ant-design/icons";


interface IconSelectorProps {
    type: string;
  }

  
  const IconSelector: React.FC<IconSelectorProps> = (props: IconSelectorProps) => {
    const Icons = {
      QuestionOutlined: <QuestionOutlined />,
      DashboardOutlined: <DashboardOutlined />,
      SmileOutlined: <SmileOutlined />,
      FormOutlined: <FormOutlined />,
      TabletOutlined: <TabletOutlined />,
      ProfileOutlined: <ProfileOutlined />,
      CheckCircleOutlined: <CheckCircleOutlined />,
      WarningOutlined: <WarningOutlined />,
      UserOutlined: <UserOutlined />,
      HighlightOutlined: <HighlightOutlined />,
      TableOutlined: <TableOutlined />,
      LayoutOutlined: <LayoutOutlined />,
      LineChartOutlined: <LineChartOutlined />,
      MenuOutlined: <MenuOutlined />,
      AppstoreAddOutlined: <AppstoreAddOutlined />,
      SwitcherOutlined: <SwitcherOutlined />,
      FileTextOutlined: <FileTextOutlined />
    };
  
    const getIcon = (type: string) => {
      // Default Icon when not found
      let comp = <QuestionOutlined />;
  
      let typeNew = type;
  
      // Default is Outlined when no theme was appended (ex: 'smile')
      if (!typeNew.match(/.+(Outlined|Filled|TwoTone)$/i)) {
        typeNew += 'Outlined';
      }
  
      // If found by key then return value which is component
      const found = Object.entries(Icons).find(([k]) => k.toLowerCase() === typeNew.toLowerCase());
      if (found) {
        [, comp] = found;
      }
  
      return comp;
    };
  
    return getIcon(props.type);
  };
  
  export default IconSelector;
