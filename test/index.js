'use strict';
const expect = require('chai').expect;
const extract = require('./extract');

describe('Extract', function() {
  describe('Float', function() {
    it('should extract a single float', function() {
      expect(
        extract.float('some string with 19.233 a float')
      ).to.equal(19.233);
    });

    it('should extract a float using comma', function() {
      expect(
        extract.float('some string with 19,233 a float')
      ).to.equal(19.233);
    });

    it('should extract the first single float', function() {
      expect(
        extract.float('some string with 19.233 float and 12.22')
      ).to.equal(19.233);
    });

    it('should extract the first single float', function() {
      expect(
        extract.float('some string with 19.233 float and 12.22')
      ).to.equal(19.233);
    });
  });

  describe('Floats', function() {
    it('should extract multiple floats', function() {
      expect(
        extract.floats('some string with 19.233 float and 12.344')
      ).to.deep.equal([19.233, 12.344]);
    });

    it('should extract multiple floats including comma', function() {
      expect(
        extract.floats('some string with 19.233 float and 12,344')
      ).to.deep.equal([19.233, 12.344]);
    });
  });

  describe('Between', function() {
    it('should extract a string', function() {
      expect(
        extract.between('some string with contents', 'some', 'with')
      ).to.equal(' string ');
    });

    it('should extract from beginning if no start', function() {
      expect(
        extract.between('some string with contents', null, 'with')
      ).to.equal('some string ');
    });

    it('should extract to end if no end', function() {
      expect(
        extract.between('some string with contents', 'string', null)
      ).to.equal('string with contents');
    });
  });

  describe('Between all', function() {
    it('should extract all strings', function() {
      expect(
        extract.betweenAll(
          'some string with contents and some other string with contents',
          'some', 'with'
        )
      ).to.deep.equal([' string ', ' other string ']);
    });
  });
});
