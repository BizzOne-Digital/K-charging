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
      { title: 'Zero-CapEx Site Leasing', shortDescription: 'We lease unused parking spaces from malls, supermarkets, and roadside businesses with zero upfront cost.', description: 'We rent unused parking spaces from shopping malls, supermarkets, and roadside business owners, transforming idle property into steady rental income with zero upfront cost to the landowner.', icon: 'home', features: ['Zero upfront cost to the property owner', 'Steady, hands-off lease income', 'Turns idle space into productive revenue', 'Flexible lease terms for any property type'], order: 1 },
      { title: 'Premium Hardware: Tesla & FLO', shortDescription: 'We procure, deploy, and own elite commercial charging hardware from Tesla and FLO.', description: 'We procure, deploy, and own elite commercial charging hardware directly from industry leaders Tesla and FLO, ensuring top reliability, speed, and cross-vehicle compatibility.', icon: 'zap', features: ['Tesla & FLO certified hardware', 'Fast, reliable charging speeds', 'Cross-vehicle compatibility', 'We own and maintain the equipment'], order: 2 },
      { title: 'End-to-End Installation & Grid Integration', shortDescription: 'Engineering, permits, site design, and electrical upgrades handled from start to finish.', description: 'Our team handles all engineering, utility permits, site design, electrical upgrades, and physical installation to bring fast EV charging online seamlessly.', icon: 'tool', features: ['Site assessment & engineering', 'Utility permits & grid integration', 'Electrical upgrades', 'Seamless, fast-tracked installation'], order: 3 },
      { title: 'Increased Foot Traffic & Dwell Time', shortDescription: 'High-speed charging hubs bring high-value EV drivers directly to your retail location.', description: 'By establishing high-speed charging hubs at your retail location, we drive high-value EV drivers directly to your supermarket or mall, significantly increasing retail spend while they charge.', icon: 'trending', features: ['Attracts affluent EV drivers', 'Increases average dwell time', 'Boosts in-store retail spend', 'Positions your property as EV-friendly'], order: 4 },
      { title: 'Fully Managed Charging Operations', shortDescription: '100% of network management, payments, and maintenance — handled for you.', description: 'We handle 100% of network management, payment processing, and routine maintenance—allowing property owners to earn lease income completely hands-off.', icon: 'shield', features: ['24/7 network monitoring (98%+ uptime)', 'PCI-compliant payment processing', 'Dedicated business support line', 'Priority maintenance & performance warranty'], order: 5 },
    ];
    for (const s of services) { await Service.create(s); }
    console.log('Services seeded');
  }
};

module.exports = { seedAdmin };
