from m5stack import lcd

# LCD

# setup
lcd.clear(0xC70039)
lcd.fill(0x222222)

# lcd.arc(0, 0, 10, 30, 40, 0)
lcd.circle(290, 150, 20)
lcd.ellipse(260, 50, 10, 10) #comment
# lcd.font(lcd.FONT_Comic) // not working
# fontSize = lcd.fontSize(); // not working
lcd.line(10, 100, 50, 40)
lcd.lineByAngle(100, 100, 5, 50, 180)
lcd.pixel(200, 200, 0xAABBFF)
# lcd.polygon(10, 10, 30, 30, 10)
# comment
lcd.print('hello world', 130, 50)
lcd.rect(50, 100, 150, 100, 0xEEFFFF)
lcd.triangle(200, 0, 10, 20, 50, 80, 0xFFFFFF) 

