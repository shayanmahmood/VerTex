import { add } from 'date-fns';

function fromToday(numDays, withTime = true) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const shares = [
  // CABIN 001
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    stockId: 182,
    investerId: 667,
    isBroker: true,
    monitoring: 'Just Money.',
    status: "in-profit",
  },
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    stockId: 182,
    investerId: 691,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-profit",
  },
  {
    created_at: fromToday(-27, true),
    startDate: fromToday(12),
    stockId: 183,
    investerId: 689,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-profit",
  },

  // CABIN 002
  {
    created_at: fromToday(-45, true),
    startDate: fromToday(-45),
    stockId: 185,
    investerId: 688,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "unconfirmed",
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(15),
    stockId: 184,
    investerId: 687,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "unconfirmed",
  },
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(33),
    stockId: 184,
    investerId: 686,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-loss",
  },

  // CABIN 003
  {
    created_at: fromToday(-65, true),
    startDate: fromToday(-25),
    stockId: 189,
    investerId: 685,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-loss",
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(-2),
    stockId: 188,
    investerId: 684,
    isBroker: true,
    monitoring: 'We will be bringing our small dog with us',
    status: "in-profit",
  },
  {
    created_at: fromToday(-14, true),
    startDate: fromToday(-14),
    stockId: 185,
    investerId: 683,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-profit",
  },

  // CABIN 004
  {
    created_at: fromToday(-30, true),
    startDate: fromToday(-4),
    stockId: 185,
    investerId: 682,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-profit",
  },
  {
    created_at: fromToday(-1, true),
    startDate: fromToday(12),
    stockId: 189,
    investerId: 681,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-profit",
  },
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(18),
    stockId: 188,
    investerId: 680,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-profit",
  },

  // CABIN 005
  {
    created_at: fromToday(0, true),
    startDate: fromToday(14),
    stockId: 189,
    investerId: 679,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-loss",
  },
  {
    created_at: fromToday(-6, true),
    startDate: fromToday(-6),
    stockId: 182,
    investerId: 678,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-loss",
  },
  {
    created_at: fromToday(-4, true),
    startDate: fromToday(-4),
    stockId: 187,
    investerId: 677,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "unconfirmed",
  },

  // CABIN 006
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(0),
    stockId: 189,
    investerId: 676,
    isBroker: true,
    monitoring: "We will be checking in late, around midnight. Hope that's okay :)",
    status: "in-loss",
  },
  {
    created_at: fromToday(-16, true),
    startDate: fromToday(-16),
    stockId: 188,
    investerId: 675,
    isBroker: true,
    monitoring: 'I will need a rollaway bed comapny share for one of the guests',
    status: "in-profit",
  },
  {
    created_at: fromToday(-18, true),
    startDate: fromToday(-4),
    stockId: 188,
    investerId: 674,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-profit",
  },

  // CABIN 007
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(17),
    stockId: 186,
    investerId: 673,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "unconfirmed",
  },
  {
    created_at: fromToday(-7, true),
    startDate: fromToday(40),
    stockId: 182,
    investerId: 672,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "unconfirmed",

  },
  {
    created_at: fromToday(-55, true),
    startDate: fromToday(32),
    stockId: 186,
    investerId: 671,
    isBroker: true,
    monitoring: 'SomeThing is Going',
    status: "in-loss",
  },

  // CABIN 008
  {
    created_at: fromToday(-8, true),
    startDate: fromToday(-5),
    stockId: 187,
    investerId: 668,
    isBroker: true,
    monitoring: 'My wife has a gluten allergy so I would like to request a gluten-free breakfast company if possible',
    status: "in-profit",
  },
  {
    created_at: fromToday(0, true),
    startDate: fromToday(0),
    stockId: 188,
    investerId: 671,
    isBroker: true,
    monitoring: 'He is celebrating!',
    status: "in-profit",
  },
  {
    created_at: fromToday(-10, true),
    startDate: fromToday(10),
    stockId: 189,
    investerId: 666,
    isBroker: true,
    status: "in-profit",
    monitoring: 'Making huge Profit'
  },
];
