import { LabelTraslate } from "@app/contexts/Language/LanguageContext";

export interface  ItemMenuProps {
    key:string;
    title:string;
    link?: string;
    icon?:  string;
}

export interface ItemMenuComplexProps{
    key:string;
    title:string;
    link?: string;
    icon?: string;
    children?:ItemMenuProps[]; 
}

export default ItemMenuProps;



export const menuItems:ItemMenuComplexProps[]  = [

    { key: "1", title:"Dashboard",link: "/dashboard", icon: "DashboardOutlined" },
    { 
        key: "2", title:"Seguridad", icon: "LayoutOutlined", children:
        [
            { key: "2.1", title: "Roles",link: "/seguridad/roles"  },
            { key: "2.2", title:"Layout",link: "/layout/gridLayout"  }
        ] 
     },
     { 
        key: "3", title:"Form", icon: "FormOutlined", children:
        [
            { key: "3.1", title:"Form Elements",link: "/form/form-elements"  },
            { key: "3.2", title:"Form Components",link: "/form/form-components"  },
            { key: "3.3", title:"Form Controls",link: "/form/form-controls"  }
        ] 
     },
     { 
        key: "4", title:"Navigation", icon: "MenuOutlined", children:
        [
            { key: "4.1", title:"Affix / Breadcrumbs",link: "/form/form-elements"  },
            { key: "4.2", title:"Dropdown",link: "/form/form-components"  },
            { key: "4.3", title:"Menu",link: "/form/form-controls"  },
            { key: "4.4", title:"Menu",link: "/form/form-elements"  },
            { key: "4.5", title:"Pagination",link: "/form/form-components"  },
            { key: "4.6", title:"Pageheader",link: "/form/form-controls"  },
            { key: "4.7", title:"Steps",link: "/form/form-controls"  }
        ] 
     },
     { 
        key: "5", title:"Components", icon: "AppstoreAddOutlined", children:
        [
            { key: "5.1", title:"Buttons",link: "/form/form-elements"  },
            { key: "5.2", title:"Typography",link: "/form/form-components"  }
        ] 
     },
     { 
        key: "6", title:"Form", icon: "FormOutlined", children:
        [
            { key: "6.1", title:"Basic Calendar",link: "/form/form-elements"  },
            { key: "6.2", title:"Notice Calendar",link: "/form/form-components"  },
            { key: "6.3", title:"Selectable Calendar",link: "/form/form-controls"  }
        ] 
     },
     { 
        key: "7", title:"Datadisplay", icon: "TableOutlined", children:
        [
            { key: "7.1", title:"List",link: "/form/form-elements"  },
            { key: "7.2", title:"Tooltips/Popovers",link: "/form/form-components"  }
        ] 
     },
     { key: "8", title:"Charts",link: "/charts", icon: "LineChartOutlined"},
     { key: "9", title:"Profile",link: "/charts", icon: "ProfileOutlined"},
     { key: "10", title:"Table",link: "/charts", icon: "LineChartOutlined"},
     { key: "11", title:"Language Switcher",link: "/charts", icon: "SwitcherOutlined"},
     { key: "12", title:"docs",link: "/charts", icon: "FileTextOutlined"},
];

