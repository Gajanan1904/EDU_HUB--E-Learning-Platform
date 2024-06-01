n=int(input("ENTER A NUMBER:"))
def is_ducknumber(n):
    num_str=str(n)
    if 0 in num_str:
        return True
    else:
        return False
    
if is_ducknumber(n):
    print("YES")
else:
    print("NO")