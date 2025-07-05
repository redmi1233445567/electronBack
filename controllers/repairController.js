const Repair = require('../models/Repair');

// جلب جميع الإصلاحات مع دعم البحث
exports.getRepairs = async (req, res) => {
  try {
    const query = {};

    // البحث حسب اسم العميل
    if (req.query.name) {
      query.customerName = { $regex: req.query.name, $options: 'i' };
      console.log('Search query:', query); // إضافة تسجيل للتحقق
    }

    const repairs = await Repair.find(query);
    console.log('Found repairs:', repairs); // إضافة تسجيل للتحقق
    res.status(200).json({ success: true, data: repairs });
  } catch (err) {
    console.error('Error fetching repairs:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// جلب إصلاح معين بناءً على المعرف
exports.getRepairById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      return res.status(404).json({ success: false, error: 'Repair not found' });
    }
    res.status(200).json({ success: true, data: repair });
  } catch (err) {
    console.error('Error fetching repair by ID:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// باقي الدوال (addRepair, updateRepair, deleteRepair)
exports.addRepair = async (req, res) => {
  try {
    const { customerName, mobile, issue, receivedDate, deliveryDate } = req.body;

    if (!customerName || !mobile || !issue) {
      return res.status(400).json({ success: false, error: 'customerName, mobile, and issue are required' });
    }

    const repair = new Repair({
      customerName,
      mobile,
      issue,
      receivedDate: receivedDate ? new Date(receivedDate) : Date.now(),
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
    });

    await repair.save();
    res.status(201).json({ success: true, data: repair });
  } catch (err) {
    console.error('Error adding repair:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { customerName, mobile, issue, receivedDate, deliveryDate } = req.body;

    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      return res.status(404).json({ success: false, error: 'Repair not found' });
    }

    if (customerName) repair.customerName = customerName;
    if (mobile) repair.mobile = mobile;
    if (issue) repair.issue = issue;
    if (receivedDate) repair.receivedDate = new Date(receivedDate);
    if (deliveryDate) repair.deliveryDate = new Date(deliveryDate);

    await repair.save();
    res.status(200).json({ success: true, data: repair });
  } catch (err) {
    console.error('Error updating repair:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const repair = await Repair.findByIdAndDelete(req.params.id);
    if (!repair) {
      return res.status(404).json({ success: false, error: 'Repair not found' });
    }
    res.status(200).json({ success: true, message: 'Repair deleted successfully' });
  } catch (err) {
    console.error('Error deleting repair:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};