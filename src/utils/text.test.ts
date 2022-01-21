import { trimComments } from './text';

describe.only('text', () => {
  test('should replace any comments in code', () => {
    // ACT
    const result = trimComments(
      `from m5stack import lcd\n
      lcd.pixel(200, 200, 0xAABBFF);\n
      # lcd.readPixel(200, 200);\n
      lcd.line(10, 20, 50, 40, 0x445577);\n
      lcd.lineByAngle(100,10, 5, 300, 180, 0xFFFFFF); # comment\n
      # lcd.polygon(10, 30, 10, 5, 1, 0xFFFFFF);\n`
    );

    // ASSERT
    expect(result.indexOf('#')).toStrictEqual(-1);
  });
});
