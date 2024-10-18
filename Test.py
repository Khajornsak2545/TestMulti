#ฟังก์ชันสำหรับค้นหา
def find_busiest_intersections(intersections):

    if not intersections: #เช็คว่าค่าที่รับมาเป็นค่าว่างหรือไม่ 
        return [] #ถ้า Dictionary เป็นค่าว่างจะคืนค่าว่าง
    
    max_vehicles = max(intersections.values()) #จำนวนรถที่ผ่านมากที่สุด #O(n) เพราะต้องดูทุกค่าใน Dictionary
    busiest_intersections = [key for key, value in intersections.items() if value == max_vehicles] #ใช้ list Comparisons เพื่อสร้างลิสต์ของชื่อแยกที่มีจำนวนเท่ากับรถ O(n)วนดูใน dictionaries อีกครั้ง
    return busiest_intersections #คืนค่าลิสต์ที่สร้างขึ้นจากตัวแปร busiest_intersections


#สำหรับ Test
import unittest

class TestFindBusiestIntersections(unittest.TestCase):
    def test_single_busiest(self):
        intersections = {
            'A': 5,
            'B': 3,
            'C': 4
        }
        self.assertEqual(find_busiest_intersections(intersections), ['A'])
    
    def test_Multiple_busiest(self):
        intersections = {
            'A': 5,
            'B': 5,
            'C': 4
        }
        self.assertEqual(find_busiest_intersections(intersections), ['A','B'])

    def test_all_equal(self): #เทสกรณีที่จำนวนรถเท่ากันทั้งหมด
        intersections = {
            'A': 5,
            'B': 5,
            'C': 5
        }
        self.assertEqual(find_busiest_intersections(intersections), ['A','B','C'])

    def test_empty_dict(self): #เทสกรณีที่เป็นค่าว่าง = ไม่มีทางแยก
        intersections = {}
        self.assertEqual(find_busiest_intersections(intersections), [])

    def test_single_intersection(self): #เทสกรณีมีทางแยกเดียวใน dictionary
        intersections = {
            'A': 10
        }
        self.assertEqual(find_busiest_intersections(intersections), ['A'])
    
if __name__ == '__main__':
    unittest.main()