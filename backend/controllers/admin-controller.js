const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');

const adminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const admin = new Admin({
            ...req.body,
            password: hashedPass
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        if (existingAdminByEmail) {
            return res.send({ message: 'Email already exists' });
        }

        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });
        if (existingSchool) {
            return res.send({ message: 'School name already exists' });
        }

        let result = await admin.save();
        result.password = undefined;
        res.send(result);

    } catch (err) {
        res.status(500).json(err);
    }
};

const adminLogIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.send({ message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.send({ message: "User not found" });
        }

        const validated = await bcrypt.compare(req.body.password, admin.password);
        if (!validated) {
            return res.send({ message: "Invalid password" });
        }

        admin.password = undefined;
        res.send(admin);

    } catch (err) {
        res.status(500).json(err);
    }
};



const getAdminDetail = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.send({ message: "No admin found" });
        }

        admin.password = undefined;
        res.send(admin);
    } catch (err) {
        res.status(500).json(err);
    }
};


const deleteAdmin = async (req, res) => {
    try {
        const result = await Admin.findByIdAndDelete(req.params.id)

        await Sclass.deleteMany({ school: req.params.id });
        await Student.deleteMany({ school: req.params.id });
        await Teacher.deleteMany({ school: req.params.id });
        await Subject.deleteMany({ school: req.params.id });
        await Notice.deleteMany({ school: req.params.id });
        await Complain.deleteMany({ school: req.params.id });

        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const updateAdmin = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }
        let result = await Admin.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

module.exports = { adminRegister, adminLogIn, getAdminDetail, deleteAdmin, updateAdmin };

