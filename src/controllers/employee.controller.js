'use strict';
const Employee = require('../models/employee.model');
exports.findAll = function (req, res) {
    console.log(req,res)
    Employee.findAll(function (err, response) {
        // console.log('controller')
        // if (err)
        //     res.send(err);
        // console.log('res', employee);
        // res.send(employee);
        console.log(err,response)
        if (err) {
            return res.json(req, res, err);
        }
        console.log(response)
        if (response && response.length) {
            updatedData = response.map((item) => {
                updatedItem = {};
                updatedItem.username = item.username;
                updatedItem.name = item.name;
                updatedItem.phoneNumber = item.phoneNumber;
                updatedItem.createdDate = item.createdDate;
                return updatedItem;
            })
            res.json({
                status: true,
                data: updatedData
            });
        } else {
            res.status(400);
            res.json({
                status: false,
                message: "No User exist"
            });
        }
    });
};
exports.create = function (req, res) {
    const new_employee = new Employee(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        var requestUsername = req.body.username;
        Employee.findByUsername(requestUsername, function (err, employee) {
            if (err) {
                res.json({
                    status: false,
                    message: err
                });
            }
            if ((response || []).length === 0) {
                var user = Employee.create(
                    req.body.username,
                    md5(req.body.password),
                    req.body.firstName,
                    req.body.phoneNumber,
                    req.body.socialId || '',
                    new Date(),
                    ""
                );
                user.save(function (err, response) {
                    if (err) {
                        res.json(req, res, err);
                        return
                    }
                    delete response.__v;
                    res.json({
                        status: true,
                        body: { id: response._id }
                    })

                });
            } else {
                res.status(400);
                res.json({
                    status: false,
                    message: "User Already Exists"
                })
            }
        });
        // Employee.create(new_employee, function (err, employee) {
        //     if (err)
        //         res.send(err);
        //     res.json({ error: false, message: "Employee added successfully!", data: employee });
        // });
    }
};
exports.findById = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Employee.update(req.params.id, new Employee(req.body), function (err, employee) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'Employee successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    Employee.delete(req.params.id, function (err, employee) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Employee successfully deleted' });
    });
};