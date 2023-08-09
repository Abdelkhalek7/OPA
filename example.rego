package example

default allow := false                              # unless otherwise defined, allow is false
 payload :=io.jwt.decode(input.token)


allow := true { 
   payload[1].role == "admin" 
}
allow := true { 
  some i
  input.permission == data.permissions[payload[1].role][i]

}


