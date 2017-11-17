package main

import (
	"github.com/labstack/echo"
	"log"
	"net/http"
	"time"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"os"
	"fmt"
)

//db user table
type User struct {

	UserNumber int `gorm:"AUTO_INCREMENT"`
	UserUid string `json:"user_uid"`
	UserEmail string `json:"user_email"`
	UserRegDate time.Time
	UserLastConnectDate time.Time
	UserNickName string
}

//login response
type LoginResponse struct {
	Message string `json:"message" xml:"message"`
	UserNickname string `json:"user_nickname" xml:"user_nickname"`
	UserToken string `json:"user_token" xml:"user_token"`
	IsFirstUser bool `json:"is_first_user" xml:"is_first_user"`
}

var (
	db *gorm.DB
	err error
	myLogger *log.Logger
)


func main() {

	//make db
	db, err = gorm.Open("mysql", "root:root@tcp(127.0.0.1:3306)/main?charset=utf8&parseTime=true")
	defer db.Close()

	db.SingularTable(true)

	if err != nil {
		log.Fatal(err)
	}

	//logger
	myLogger = log.New(os.Stdout, "Debug: ", log.LstdFlags)

	//echo
	e := echo.New()
	e.Static("/","./client/dist")

	//login api
	e.POST("/login", login).Name = "login"

	s := &http.Server{
		Addr:         ":3000",
		ReadTimeout:  20 * time.Minute,
		WriteTimeout: 20 * time.Minute,
	}

	log.Fatal(e.StartServer(s))
}

// Handler
func login(c echo.Context) error {

	u := new(User)

	//컨텍스트에서 바인드
	if err := c.Bind(u); err != nil {

		myLogger.Println("login(uid) : " + u.UserUid)
		myLogger.Println("login(email) : " + u.UserEmail)

		return err
	}

	//make for response
	var r = LoginResponse{
		Message:  "login_fail",
		UserNickname: "",
		UserToken: "",
		IsFirstUser:false,
	}

	//현재 시간 등록
	u.UserLastConnectDate = time.Now()

	countValue := 0
    if err := db.Table("User").Where("user_uid=?",u.UserUid).Count(&countValue).Error; err != nil {
    	fmt.Println(err)
	}
	//try to check database
	if countValue == 0 { // => returns `true` as primary key is blank

		//신규 등록
		u.UserNickName = "newbie"
		u.UserRegDate = time.Now()
		db.Create(&u)

		r.IsFirstUser = true

	} else {

		//이미 가입 되 있음 기존 정보 불러옴
		db.Where("user_uid = ?", u.UserUid).Find(&u)


		r.IsFirstUser = false
	}

	r.UserNickname = u.UserNickName
	r.UserToken = "test token"
	r.Message = "login success"

	//test log
	myLogger.Println("login")

	return c.JSON(http.StatusOK, r)
}

