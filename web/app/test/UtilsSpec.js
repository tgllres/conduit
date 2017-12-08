import { toClassName, metricToFormatter } from '../js/components/util/Utils.js';

describe('Utils', () => {
  describe('Metric Formatters', () => {
    it('formats undefined input', () => {
      let undefinedMetric;
      expect(metricToFormatter["REQUEST_RATE"](undefinedMetric)).to.equal('--- RPS');
      expect(metricToFormatter["SUCCESS_RATE"](undefinedMetric)).to.equal('---');
      expect(metricToFormatter["LATENCY"](undefinedMetric)).to.equal('--- ms');
    });

    it('formats requests', () => {
      expect(metricToFormatter["REQUEST_RATE"](99)).to.equal('99 RPS');
      expect(metricToFormatter["REQUEST_RATE"](999)).to.equal('999 RPS');
      expect(metricToFormatter["REQUEST_RATE"](1000)).to.equal('1e+3 RPS');
      expect(metricToFormatter["REQUEST_RATE"](9999)).to.equal('1e+4 RPS');
    });

    it('formats latency', () => {
      expect(metricToFormatter["LATENCY"](99)).to.equal('99 ms');
      expect(metricToFormatter["LATENCY"](999)).to.equal('999 ms');
      expect(metricToFormatter["LATENCY"](1000)).to.equal('1,000 ms');
      expect(metricToFormatter["LATENCY"](9999)).to.equal('9,999 ms');
      expect(metricToFormatter["LATENCY"](99999)).to.equal('99,999 ms');
    });

    it('formats success rate', () => {
      expect(metricToFormatter["SUCCESS_RATE"](0.012345)).to.equal('1.23%');
      expect(metricToFormatter["SUCCESS_RATE"](0.01)).to.equal('1.00%');
      expect(metricToFormatter["SUCCESS_RATE"](0.1)).to.equal('10.00%');
      expect(metricToFormatter["SUCCESS_RATE"](0.9999)).to.equal('99.99%');
      expect(metricToFormatter["SUCCESS_RATE"](4)).to.equal('400.00%');
    });
  });

  describe('toClassName', () => {
    it('converts a string to a valid class name', () => {
      expect(toClassName('foo/bar/baz')).to.equal('foo_bar_baz');
      expect(toClassName('FOOBAR')).to.equal('foobar');
      expect(toClassName('FooBar')).to.equal('foo_bar');
    });
  });
});
