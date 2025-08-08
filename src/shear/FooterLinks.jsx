const FooterLinks = () => {
    const linkColumns = [
      {
        title: 'Company',
        links: [
          { label: 'About', url: '#' },
          { label: 'Features', url: '#' },
          { label: 'Works', url: '#' },
          { label: 'Career', url: '#' }
        ]
      },
      {
        title: 'Help',
        links: [
          { label: 'Customer Support', url: '#' },
          { label: 'Delivery Details', url: '#' },
          { label: 'Terms & Conditions', url: '#' },
          { label: 'Privacy Policy', url: '#' }
        ]
      },
      {
        title: 'FAQ',
        links: [
          { label: 'Account', url: '#' },
          { label: 'Manage Deliveries', url: '#' },
          { label: 'Orders', url: '#' },
          { label: 'Payments', url: '#' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { label: 'Free eBooks', url: '#' },
          { label: 'Development Tutorial', url: '#' },
          { label: 'How to - Blog', url: '#' },
          { label: 'Youtube Playlist', url: '#' }
        ]
      }
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
        {linkColumns.map((column, index) => (
          <div key={index}>
            <h3 className="font-semibold uppercase text-sm tracking-wider mb-4">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a 
                    href={link.url} 
                    className="text-gray-600 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default FooterLinks;