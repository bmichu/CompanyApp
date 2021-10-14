const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if any arg is missing', () => {
        const empOne = new Employee({}); 
        const empTwo = new Employee({
            firstName: 'Amanda',
            lastName: 'Doe'
        });
        const empThree = new Employee({
            lastName: 'Doe',
            department: '606f55b17240f3408acc2947'
        });
        const empFour = new Employee({
            firstName: 'Amanda',
            department: '606f55b17240f3408acc2947'
        });

        const cases = [empOne, empTwo, empThree, empFour];

        for (let emp of cases){
            emp.validate(err => {
                expect(err.errors).to.exist;
            });
        }
    });

    it('should throw an error if "name" is not a string', () => {
        const empOne = new Employee({
            firstName: 'Amanda',
            lastName: 'Doe',
            department: {}
        });
        const empTwo = new Employee({
            firstName: {},
            lastName: 'Doe',
            department: '606f55b17240f3408acc2947'
        });
        const empThree = new Employee({
            firstName: 'Amanda',
            lastName: [],
            department: '606f55b17240f3408acc2947'
        });

        const cases = [empOne, empTwo, empThree];

        for (let emp of cases){
            emp.validate(err => {
                expect(err.errors).to.exist;
            });
        }
      });

    it('should not throw an error if everything is okay', () => {
        const emp = new Employee({
            firstName: 'Amanda',
            lastName: 'Doe',
            department: '606f55b17240f3408acc2947'
        });
        emp.validate(err => {
            expect(err).to.not.exist;
        });
    });

    after(() => {
        mongoose.models = {};
      });
  
});