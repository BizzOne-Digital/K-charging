const User = require('../models/User');
const Service = require('../models/Service');

const seedAdmin = async () => {
  const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!adminExists) {
    await User.create({
      name: 'K Charging Admin',
      email: process.env.ADMIN_EMAIL || 'admin@kchargingsolutions.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin',
    });
    console.log('Admin user seeded');
  }

  const servicesCount = await Service.countDocuments();
  if (servicesCount === 0) {
    const services = [
      { title: 'Commercial EV Charging', shortDescription: 'Level 2 & DC fast charging stations for commercial properties.', description: 'We design and install comprehensive EV charging infrastructure for commercial buildings, shopping centers, hotels, and parking facilities. Our solutions include Level 2 and DC fast chargers tailored to your property\'s needs.', icon: 'building', features: ['Custom site assessment', 'Level 2 & DC fast chargers', 'Network management software', '24/7 remote monitoring', 'Revenue management options'], order: 1 },
      { title: 'Fleet Charging Solutions', shortDescription: 'Dedicated charging infrastructure for corporate and commercial fleets.', description: 'Optimize your fleet operations with dedicated charging depots designed for commercial and corporate fleets. We provide smart scheduling, load management, and fleet analytics.', icon: 'truck', features: ['Fleet depot design', 'Smart load management', 'Fleet analytics dashboard', 'Overnight charging optimization', 'Multi-vehicle scheduling'], order: 2 },
      { title: 'Workplace Charging', shortDescription: 'Employee EV charging programs for forward-thinking companies.', description: 'Attract and retain top talent with workplace charging benefits. Our workplace programs include installation, billing management, and employee-friendly apps.', icon: 'briefcase', features: ['Employee benefit programs', 'Cost reimbursement options', 'Easy billing management', 'Scalable infrastructure', 'Sustainability reporting'], order: 3 },
      { title: 'Residential & Multi-Unit', shortDescription: 'EV charging for condos, apartments, and residential buildings.', description: 'Future-proof your residential property with EV charging. We specialize in multi-unit residential installations with per-unit billing and condo board solutions.', icon: 'home', features: ['Condo board consulting', 'Per-unit billing systems', 'Common area charging', 'Load sharing technology', 'Resident app access'], order: 4 },
      { title: 'Installation & Maintenance', shortDescription: 'Certified installation and ongoing maintenance services.', description: 'Our certified electricians and EV charging specialists handle every aspect of installation. From electrical assessment to final commissioning, we ensure everything works flawlessly.', icon: 'tool', features: ['Site assessment & design', 'Certified installation', 'Electrical upgrades', 'Preventive maintenance', 'Emergency support'], order: 5 },
      { title: 'Smart Charging Management', shortDescription: 'Cloud-based software to manage your entire charging network.', description: 'Our smart charging platform gives you complete visibility and control over your EV charging network. Monitor usage, manage access, set pricing, and generate reports from one dashboard.', icon: 'cpu', features: ['Real-time monitoring', 'Access control & RFID', 'Dynamic pricing', 'Usage analytics', 'API integrations'], order: 6 },
    ];
    await Service.insertMany(services);
    console.log('Services seeded');
  }
};

module.exports = { seedAdmin };
