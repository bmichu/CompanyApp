const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {
  
      try {
        const fakeDB = new MongoMemoryServer();
    
        const uri = await fakeDB.getUri();
    
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
      } catch(err) {
        console.log(err);
      }
      
    });

    describe('Reading data', () => {

        before(async () => {
            const empOne = new Employee({ firstName: 'One', lastName: 'One', department: '606f55b17240f3408acc2567' });
            await empOne.save();
        
            const empTwo = new Employee({ firstName: 'Two', lastName: 'Two', department: '606f55b17240f3408acc2568' });
            await empTwo.save();
        });
    
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });
    
        it('should return proper document by various params with "findOne" method', async () => {
            const employee = await Employee.findOne({ firstName: 'One'});
            expect(employee.firstName).to.be.equal('One');
        });
    
        after(async () => {
          await Employee.deleteMany();
        });
    
      });

      describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
          const employee = new Employee({ firstName: 'One', lastName: 'One', department: '606f55b17240f3408acc2567' });
          await employee.save();
          expect(employee.isNew).to.be.false;
        });
    
        after(async () => {
          await Employee.deleteMany();
        });
      
      });

      describe('Updating data', () => {

        beforeEach(async () => {
            const empOne = new Employee({ firstName: 'One', lastName: 'One', department: '606f55b17240f3408acc2567' });
            await empOne.save();
        
            const empTwo = new Employee({ firstName: 'Two', lastName: 'Two', department: '606f55b17240f3408acc2300' });
            await empTwo.save();
        });
    
        it('should properly update one document with "updateOne" method', async () => {
          await Employee.updateOne({ firstName: 'One' }, { $set: { firstName: 'Oneone' }});
          const updatedEmployee = await Employee.findOne({ firstName: 'Oneone' });
          expect(updatedEmployee).to.not.be.null;
        });
      
        it('should properly update one document with "save" method', async () => {
          const employee = await Employee.findOne({ firstName: 'One', lastName: 'One', department: '606f55b17240f3408acc2567' });
          employee.firstName = 'Oneone';
          await employee.save();
    
          const updatedEmployee = await Employee.findOne({ firstName: 'Oneone', lastName: 'One', department: '606f55b17240f3408acc2567' });
          expect(updatedEmployee).to.not.be.null;
        });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
          await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
          const employees = await Employee.find();
          expect(employees[0].firstName).to.be.equal('Updated!');
          expect(employees[1].firstName).to.be.equal('Updated!');
        });

        afterEach(async () => {
              await Employee.deleteMany();
            });
          
     });

     describe('Removing data', () => {

      beforeEach(async () => {
            const empOne = new Employee({ firstName: 'One', lastName: 'One', department: '606f55b17240f3408acc2567' });
            await empOne.save();
        
            const empTwo = new Employee({ firstName: 'Two', lastName: 'Two', department: '606f55b17240f3408acc2300' });
            await empTwo.save();
        });
    
        it('should properly remove one document with "deleteOne" method', async () => {
          await Employee.deleteOne({ firstName: 'One' });
          const removeEmployee = await Employee.findOne({ firstName: 'One' });
          expect(removeEmployee).to.be.null;
        });
      
        it('should properly remove one document with "remove" method', async () => {
          const employee = Employee.findOne({ firstName: 'One' });
          await employee.remove();
          const removedEmployee = await Employee.findOne({ firstName: 'One' });
          expect(removedEmployee).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
          await Employee.deleteMany();
          const employees = await Employee.find();
          expect(employees.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany();
          });

        });
    
      after(() => {
        mongoose.models = {};
    });
  
  });
