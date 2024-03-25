from bs4 import BeautifulSoup as bs
import requests
from datetime import datetime
from openpyxl import Workbook
url='https://www.melon.com/chart/index.htm'

try:
    headers= {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' 
    }
    response =requests.get(url, headers=headers)
    
    if response.status_code==200:
        html_text=response.text
        
        soup=bs(response.text, 'html.parser')
        
       for row in table.select('tr')[1:21]:  # 첫 번째 tr은 헤더이므로 제외, 1위부터 20위까지만 선택
           rank = row.select_one('.rank').get_text(strip=True)
           album_img = row.select_one('.image_typeAll > img')['src']
           album_name = row.select_one('.ellipsis.rank01').get_text(strip=True)
           like_cnt = row.select_one('.button_etc.like > span.cnt').get_text(strip=True)
    
        print("순위:", rank)
        print("앨범 사진 URL:", album_img)
        print("앨범명:", album_name)
        print("좋아요 수:", like_cnt)
        print()
        
        wb= Workbook()
        ws=wb.active
        
        ws.append(["순위","제목","아티스트"])
        
        for row, (rank, album_img, album_name, like_cnt) in enumerate(zip(rank, album_img, album_name, like_cnt), start=1):
            ws.append([row, rank, album_img, album_name, like_cnt])
            
        
        today= datetime.now().strftime('%Y%m%d')
        
        filename= f'melon_chart_{today}.xlsx'
        wb.save(filename)
        print(f"엑셀 파일 저장 완료: {filename}")
   
   
    else:
        print(f"Error: HTTP 요청 실패. 상태 코드:{response.status_code}")
        
except requests.exceptions.RequestException as e:
    print(f"Error: 요청 중 오류 발생. 오류 메세지: {e}")
    
        