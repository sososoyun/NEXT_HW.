
num=int(input("숫자 게임 최대값을 입력해주세요:"))
input(f"""1부터 {num}까지의 숫자를 하나 생각하세요
준비가 됐으면 enter를 누르세요""")
start = 0
end = num
cnt=0

while start <= end:
  mid = (start + end) // 2
  cnt+=1
  print(f"당신이 생각한 숫자는 {mid}입니까?")
  a=input("제가 맞췄다면 '맞음', 제가 제시한 숫자보다 크다면 '큼', 작다면 '작음'을 입력해주세요: ")


  if a == '맞음':
    print(f"{cnt}번만에 맞췄다")
    break

  elif a == '큼':
    start = mid + 1

  else:
    end = mid -1
