const chai = require('chai')
const expect = chai.expect 

const {check}= require('../src/isEven')

describe('check', () =>{
        it('should return false when given an uneven number', () =>{

                //arrange 
            let expected = false;
            let input = 1;

                //act
            let result = check(0)

                //assert
            expect(result).to.be.equal(expected);
            
            
        
        })
    
})

const chaiHttp = require('chai-http')
const { joi } = require('joi')
chai.use(chaiHttp)



const app = 'https://reqres.in/api/users/2'
describe('check api', () =>{
    it('should return status code 200', (done) =>{
        chai.request(app)
        .get('')
        .end((err, res) => {
            expect(res.status).to.be.eql(200);
            done();
            });
    })
})