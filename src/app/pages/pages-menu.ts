import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Trid Activity',
    group: true,
  },
  {
    title: 'Company Management',
    icon: 'nb-star',
    children: [
      {
        title: 'Company List',
        link: '/pages/company/list',
      },
      {
        title: 'Company Details',
        link: '/pages/company/details',
      },

    ],
  },
  {
    title: 'Worker Management',
    icon: 'nb-person',
    children: [
      {
        title: 'Add Worker',
        link: '/pages/worker/addWokerCompany',
      },
      {
        title: 'Worker List',
        link: '/pages/worker/list',
      },
      {
        title: 'Worker Details',
        link: '/pages/worker/details',
      }
    ],
  },

  {
    title: 'Job Management',
    icon: 'nb-layout-centre',
    children: [
      {
        title: 'Create/Assign job',
        link: '/pages/job/Create-assign-job',
      },
      {
        title: 'Ongoing jobs',
        link: '/pages/job/Ongoing-jobs',
      },
      {
        title: 'Future jobs',
        link: '/pages/job/Future-jobs',
      },
      {
        title: 'Completed jobs',
        link: '/pages/job/Completed-jobs',
      },
      {
        title: 'No respond job',
        link: '/pages/job/No-respond-job',
      },
      {
        title: 'Complaints',
        link: '/pages/job/Complaints',
      }
    ],
  },
  {
    title: 'Customer Management',
    icon: 'nb-layout-centre',
    children: [
      {
        title: 'Private',
        link: '/pages/customer/Private-customer-list',
      },
      {
        title: 'Company',
        link: '/pages/customer/Company-customer-list',
      },
      {
        title: 'Government',
        link: '/pages/customer/Government-customer-list',
      },
      {
        title:'Add Customer',
        link:'page/customer/add-customer'
      }
    ]
  },
  {
    title: 'Menu Management',
    icon: 'nb-compose',
    children: [
      {
        title: 'Menu',
        link: '/pages/menu/list',
      },
      {
        title: 'Child Menu',
        link: '/pages/menu/childmenulist',
      },
    ],
  },
  {
    title: 'Service Management',
    icon: 'nb-compose',
    children: [
      {
        title: 'Service List',
        link: '/pages/service/list',
      },
      {
        title: 'Sub Service List',
        link: '/pages/service/subservicelist',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'nb-gear',
    children: [
      {
        title: 'State List',
        link: '/pages/setting/statelist',
      },
      {
        title: 'Country List',
        link: '/pages/setting/country',
      },
      {
        title: 'City List',
        link: '/pages/setting/city',
      },
      {
        title: 'Role',
        link: '/pages/setting/role',
      },
      {
        title: 'Menu Map',
        link: '/pages/setting/menumap',
      },
      {
        title: 'Job Category',
        link: '/pages/setting/jobCategory'
      },
      {
        title: 'Job Sub Category',
        link: '/pages/setting/jobSubCategory'
      }
    ],
  },
  {
    title: 'Chats',
    icon: 'nb-compose',
    children: [
      {
        title: 'Company',
        link: '/pages/chat',
      }
    ],
  },





];
