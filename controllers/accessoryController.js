const Accessory = require('../models/Accessory');

// إضافة إكسسوار جديد
exports.addAccessory = async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const accessory = new Accessory({ name, quantity, price });
    await accessory.save();
    res.status(201).json(accessory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// جلب جميع الإكسسوارات
exports.getAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.status(200).json({
      success: true,
      count: accessories.length,
      data: accessories,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// تصفية الإكسسوارات حسب الاسم
exports.filterAccessoriesByName = async (req, res) => {
  const { name } = req.query;
  try {
    const accessories = await Accessory.find({ name: new RegExp(name, 'i') });
    res.status(200).json({
      success: true,
      count: accessories.length,
      data: accessories,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// تصفية الإكسسوارات حسب الكمية
exports.filterAccessoriesByQuantity = async (req, res) => {
  const { minQuantity, maxQuantity } = req.query;
  try {
    const accessories = await Accessory.find({
      quantity: { $gte: minQuantity, $lte: maxQuantity },
    });
    res.status(200).json({
      success: true,
      count: accessories.length,
      data: accessories,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// تصفية الإكسسوارات حسب السعر
exports.filterAccessoriesByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const accessories = await Accessory.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    res.status(200).json({
      success: true,
      count: accessories.length,
      data: accessories,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// حذف إكسسوار
exports.deleteAccessory = async (req, res) => {
  try {
    const accessory = await Accessory.findByIdAndDelete(req.params.id);
    if (!accessory) {
      return res.status(404).json({ 
        success: false, 
        message: 'الإكسسوار غير موجود' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'تم حذف الإكسسوار بنجاح',
      data: accessory 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'حدث خطأ أثناء حذف الإكسسوار',
      error: err.message 
    });
  }
};

// تحديث إكسسوار
exports.updateAccessory = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    
    // التحقق من وجود البيانات المطلوبة
    if (!name && !quantity && !price) {
      return res.status(400).json({
        success: false,
        message: 'يرجى تقديم بيانات للتحديث'
      });
    }

    // التحقق من صحة الكمية والسعر إذا تم تقديمهما
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'الكمية يجب أن تكون أكبر من أو تساوي صفر'
      });
    }

    if (price !== undefined && price < 0) {
      return res.status(400).json({
        success: false,
        message: 'السعر يجب أن يكون أكبر من أو يساوي صفر'
      });
    }

    // البحث عن الإكسسوار أولاً
    const accessory = await Accessory.findById(req.params.id);
    
    if (!accessory) {
      return res.status(404).json({
        success: false,
        message: 'الإكسسوار غير موجود'
      });
    }

    // تحديث الحقول المقدمة فقط
    if (name) accessory.name = name;
    if (quantity !== undefined) accessory.quantity = quantity;
    if (price !== undefined) accessory.price = price;

    // حفظ التغييرات
    await accessory.save();

    res.status(200).json({
      success: true,
      message: 'تم تحديث الإكسسوار بنجاح',
      data: accessory
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تحديث الإكسسوار',
      error: err.message
    });
  }
};