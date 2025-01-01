# oop概述


## 面向对象概述


### 什么是面向对象
1. 什么是面向过程PO（Produce Oriented）?
    - 解决一个问题，将其拆解成多个步骤，每个步骤用函数实现，然后依次调用这些函数。
    - 优点：性能高，因为函数调用是有开销的。
    - 缺点：代码可维护性差，复用性差。
2. 什么是面向对象OO（Object Oriented）?
    - 将问题拆解成多个对象，每个对象负责一块功能，然后通过对象之间的交互来实现整个功能。
    - 优点：代码可维护性好，复用性好。
    - 缺点：性能可能不如面向过程，因为对象之间的交互是有开销的。

::: info C++中的面向对象
C++ 通过一些性能提升技巧，使得面向对象编程的性能和面向过程编程的性能差别不大。
:::


### 面向对象编程的三大特性
1. 封装
    - 将数据和操作数据的方法封装在一起，形成一个类。，使自己的数据和方法只对特定的类或者方法开放
    - **友元函数** **限定符**
2. 继承
    - 通过继承，子类可以继承父类的属性和方法，而不用重新定义。
    - C++中继承多种多样且支持多继承，限定符只推荐使用public。
3. 多态
    - 多态是指同一个方法在不同的对象上调用，可以有不同的行为。
    - C++通过纯虚函数来实现接口的概念，通过虚函数表来实现多态。是C++程序项目设计的基石。
4. 三大特性是面向对象编程的基石，没有这三个特性，就不能算真正的面向对象编程。


::: details 简单的例子
```cpp
class Vector2 {
public:
  // 构造函数
    Vector2(int x, int y) : x(x), y(y) { 
		cout << "Constructor Vector2 ,x:"<<x<<" y: "<<y << endl; 
	}
    virtual ~Vector2() { 
		cout << "Virtual DEstructor Vector2 ,x:"<<x<<" y: "<<y << endl; 
	}
	virtual void print() const {
		cout << "Vector2: " << x << "," << y << endl;
	}
protected:
// private:
    int x;
    int y;
};
class Vector3 : public Vector2 {
public:
    Vector3(int x, int y, int z) : Vector2(x, y), z(z) {
		cout << "Constructor Vector3 " << endl;
    }
	void print() const{
		cout << "Vector3: " << x << "," << y << "," << z << endl;
	}
private:
	int z;
};

int main(int argc, char *argv[]) {
	Vector2 *v2ptr = new Vector2(11, 22);
	delete v2ptr;
	v2ptr=nullptr;
	Vector3 *v3ptr = new Vector3(11, 22, 33);
	v3ptr->print(); // 若将V3中的print()函数，注释掉，则会调用V2中的print()函数
	delete v3ptr;
	v3ptr=nullptr;
	cout<<"-------------------"<<endl;
    return 0;
}

```
运行结果：
```text
Constructor Vector2 ,x:11 y: 22
Virtual DEstructor Vector2 ,x:11 y: 22
Constructor Vector2 ,x:11 y: 22
Constructor Vector3 
Vector2: 11,22
Virtual DEstructor Vector2 ,x:11 y: 22
\-------------------
```
:::

## 类，对象，this指针
### 类 和对象
1. 类是C++的核心特性，即用户自定义的数据类型，关键字class。
2. 对象是类的实例，即用类定义的数据结构，关键字new。
3. 对象有两种生成方式，
    - 栈上生成 自动删除
    - 堆上生成 需要手动删除

### this指针
1. this指针是一个隐含于每个非静态成员函数中的特殊指针，它指向调用该成员函数的对象。
2. this指针只能在类的非静态成员函数中使用，不能在类的静态成员函数中使用。



## const和不可变对象

### const Object 和const Method
#### const Object
1. 如果C++中需要值保持不变，可以使用const关键字来进行约束，将对象声明为const，这样对象中的值就不能被修改了。
2. const对象只能调用const方法，不能调用非const方法,会对代码编写造成一定难度。
3. const Object 三种类型
    - 值
    - 指针
    - 引用
#### const Method
1. const 实例是不能够调用非const方法的，但是非const实例可以调用const方法。
2. 必须限定方法是const，表示方法不会修改对象。

### const parameter
1. const参数可以接受const和非const的参数。
2. 在函数体中，const参数不能被修改。
    - 作为值传递时，const修饰对象无法修改,但由于是值传递，所以不会影响传入的参数。
    - 作为指针传递时，const修饰对象无法修改
    - 作为引用传递时，const修饰对象无法修改
::: details 例子
```cpp
void func_value_const(const Cat cat){
	cout<<"func_value_const:"<< cat.getName() <<endl;
}

void func_value_noconst(Cat cat){
	cat.setName("Jerry"); 
	cout<<"func_value_noconst:"<< cat.getName() <<endl;
}
void func_ptr_noconst(Cat *cat){
	cat->setName("Jerry"); 
	cout<<"func_ptr_noconst:"<< cat->getName() <<endl;
}
void func_ptr_const(const Cat *cat){
	cout<<"func_ptr_const:"<< cat->getName() <<endl;
}
void func_ref_noconst(Cat &cat){
	cat.setName("Jerry"); 
	cout<<"func_ref_noconst:"<< cat.getName() <<endl;
}
void func_ref_const(const Cat &cat){
	cout<<"func_ref_const:"<< cat.getName() <<endl;
}


int main(int argc, char *argv[]) {
	const Cat cat4{"Tom", 3};
	Cat cat5{"Jerry", 4};
	func_value_const(cat4);
	func_value_noconst(cat4);//!其实 原有的const 无法对函数体内进行限制了，是因为按值传递，函数体内会重新创建一个对象，所以可以修改
	func_value_const(cat5);
	func_value_noconst(cat5);
	const Cat* cat6 = new Cat("Tom", 3);
	Cat* cat7 = new Cat("Jerry", 4);
	func_ptr_const(cat6);
	//func_ptr_noconst(cat6); //!此时编译会报错，因为cat6是const指针，不能修改指针指向的对象
	func_ptr_const(cat7);
	func_ptr_noconst(cat7);
	const Cat& cat8 = cat4;
	Cat& cat9 = cat5;
	func_ref_const(cat8);
	//func_ref_noconst(cat8); //!此时编译会报错，因为cat8是const引用，不能修改引用指向的对象
	func_ref_const(cat9);
	func_ref_noconst(cat9);
	cout<<"-------------------"<<endl;
    return 0;
}
```
:::


### 不可变对象和可变对象
1. 不可变对象：对象创建后，其状态不能被改变，即对象中所有成员变量都是const的。
2. 不可变对象优点：
    - 对象是只读的，可以安全地共享，不需要加锁。
    - 对象创建后，其状态不能被改变，可以放心使用多线程。
3. 推荐类设计时，尽量使用const

#### 可变引用和不可变引用的动态返回

？ 那么 有没有一种写法可以使方法，可变对象返回可修改的引动，而不可变对象返回不可修改的引用呢？
这样可以使我们的代码更具有扩展性
::: details 可供参考
在`cat.h`中,将get和set设置为：
```cpp
	string &name(){
		return this->_name;
	}
	const string &name() const{
		return this->_name;
	}
```
在 `main.cpp`中 
```cpp
int main(int argc, char *argv[]) {
	Cat cat10{"Tom", 3};
	cat10.name()="Jerry"; // 返回的是引用，可以修改
	cout<<"cat10 name: "<<cat10.name()<<endl;
	const Cat cat11{"Tom", 3};
	///cat11.name()="Jerry"; //!此时编译会报错，因为cat11是const对象，不能修改对象
	cout<<"cat11 name: "<<cat11.name()<<endl;
	cout<<"-------------------"<<endl;
    return 0;
}
```
算是实现了**一种方法同时用于可变和不可变对象但不影响他们的const属性**，但是这种写法并不推荐，因为这样会降低代码的可读性。
:::
### mutable关键字
1. mutable关键字可以使得对象中的成员变量在const对象中也可以被修改。
2. mutable关键字只能用于类的非静态成员变量，不能用于静态成员变量。
3. 一般用于计数器，状态等需要修改的成员变量。
::: details mutable关键字的使用
在`cat.h`中 添加 print_count 和 print() const：
```cpp
private:
    mutable int print_count{0};

public:
void Cat::print_object() const {
	this->print_count++;
	cout<<"print_count: "<<this->print_count<<endl;
	cout<<"Cat"<<this<<": "<<this->_name<<" is age for"<<this->age<<endl;
}
```
在 `main.cpp`中 
```cpp
int main(int argc, char *argv[]) {
	const Cat cat12{"Tom", 3};
	cat12.print_object();
	cat12.print_object(); // const 对象cat12的属性 print_count 可以被修改
}
```
运行结果：
```text
print_count: 1
Cat0x7fff2c50fc70: Tom is age for3
print_count: 2    // [!code warning]
Cat0x7fff2c50fc70: Tom is age for3
```
:::
## 构造函数

### 构造函数和析构函数
1. 构造函数和析构函数是类的特殊成员函数，用于对象的创建和销毁。
2. 构造函数在对象创建时被调用，用于初始化对象的成员变量。
3. 析构函数在对象销毁时被调用，用于释放对象的资源。
    - 作用域结束的时候，会自动调用析构函数
    - delete的时候，会自动调用析构函数
4. 构造函数中如果分配了资源，析构函数中一定要释放资源，否则会造成内存泄漏。
5. 构造函数的特点
    - 构造函数没有返回值，也不需要返回值。
    - 构造函数的名称和类名相同。
    - 构造函数可以有参数，也可以没有参数。
    - 一般用于 初始化对象的成员变量。

::: details 构造函数与析构函数
在`Product.h/.cpp `中，定义到：
```cpp
#pragma once

#include <iostream>
#include <string>
using namespace std;
class Product {
public:
	Product(const string& name, const string& categroy, int years);
	Product(const string& name, const string& categroy);
	Product(const string& name);
	~Product();
	void setName(const string  name){ this->name = name; }
	void setCategroy(const string categroy){ this->category = categroy; }
	void setYears(int years){ *(this->years) = years; }
	const string& getName(){ return this->name; }
	const string& getCategroy(){ return this->category; }
	const int* getYears(){ return this->years; }
	void print_object(){
		cout<<"Product: "<<this
			<<", Name: "<<this->name
			<<", Category: "<<this->category
			<<", Years: "<<*(this->years)
			<<", Years Address:" <<this->years
			<<endl;
	}

private:
	string name{};
	string category{};
	int *years{};
};


Product::Product(const string &name, const string &categroy, int years): name(name), category(categroy), years(new int(years)) {
	cout<<"Three"<<endl;

}

Product::Product(const string &name, const string &categroy): Product(name, categroy, 0) {
	cout<<"Two"<<endl;
}

Product::Product(const string &name): Product(name, "") {
	cout<<"One"<<endl;
}

Product::~Product() {
    cout<<"Product destructor Name:"<<this->name<<endl;
    delete years;
}
```
在 `main.cpp`中 
```cpp
int main(int argc, char *argv[]) {
    Product p1("Box","Toy" ,1);
	p1.print_object();
	Product p2("Box2","Toy2" );
	p2.print_object();
	Product p3("Box3");
	p3.print_object();
	cout<<"-----------------------------"<<endl;
}
```
运行结果：
```text
Three
Product: 0x7ffcc5c5e530, Name: Box, Category: Toy, Years: 1, Years Address:0x565012f7feb0
Three
Two
Product: 0x7ffcc5c5e580, Name: Box2, Category: Toy2, Years: 0, Years Address:0x565012f802e0
Three
Two
One
Product: 0x7ffcc5c5e5d0, Name: Box3, Category: , Years: 0, Years Address:0x565012f80300
-----------------------------
Product destructor Name:Box3
Product destructor Name:Box2
Product destructor Name:Box
```
:::


### Default构造函数
1. default关键字是C++11引入的关键字，用于指定默认构造函数。
2. 在已经有构造函数的情况下，系统默认的构造函数会被隐藏，
3. default关键字来显式指定默认构造函数。

::: details Default构造函数
```cpp
int main(int argc, char *argv[]) {
    // Product p4; //!这样会报错 
	Product p4;//! 加上Product()=default; 这样就不会报错 但是容易引起其他类似空指针的错误
	p4.print_object();//运行时崩溃 Segmentation fault (core dumped)
}
```
:::


### 隐式转换与构造函数
1. C++允许隐式转换，但是不建议使用隐式转换，因为隐式转换容易引起错误。
2. C++默认开启了隐式转换，但是可以通过explicit关键字来禁止隐式转换。

::: details 隐式转换与构造函数
```cpp
int main(int argc, char *argv[]) {
    Product p5("Box5","Toy5" ,2);
	string s1="Box6";
	cout<<compareYears(p5, {s1})<<endl; //!存在隐式转换（因为包含了只有一个变量参数的构造方法），将string转换为Product
	string s2="Toy6";
	cout<<compareYears(p5, {s1,s2})<<endl; // 依然进行了隐式转换，
	//? 单独对构造函数Product(const string& name);加上修饰符 explicit，可以禁止隐式转换,但是不能禁止拷贝构造函数的隐式转换
}
```
:::


### Copy constructor 和 深拷贝
**浅拷贝和深拷贝**：<br>
1. 浅拷贝：拷贝构造函数默认是浅拷贝，即拷贝构造函数只是拷贝指针的值，而不是拷贝指针指向的内容。
2. 深拷贝：深拷贝是指拷贝构造函数会拷贝指针指向的内容，而不是拷贝指针的值。
::: details Copy constructor 浅拷贝 深拷贝
在 `Product.cpp`中 添加构造方法：
```cpp
声明：
//copy
//Product(const Product p);//!按值传递时本身就需要创建一个副本，创建副本的过程就会调用默认的拷贝构造函数，所以其实会死循环
Product(const Product& p);
实现：
//copy constructor
// 浅拷贝 （Shallow Copy ）
Product::Product(const Product &p) : name(p.getName()), category(p.getCategroy()), years(p.getYears()) {
    cout<<"Shallow Copy constructor "<<endl;
}

// 深拷贝 （Deep Copy ）
Product::Product(const Product &p) : name(p.getName()), category(p.getCategroy()), years(new int(*p.getYears())) {
    cout<<"Deep Copy constructor "<<endl;
}
```
在 `main.cpp`中 添加代码：
```cpp
int main(int argc, char *argv[]) {
	Product p6("Box6","Toy6" ,3);
	/* 
	! 此时p6和p7的years都为3，因为拷贝构造函数是浅拷贝price都是指向同一个地址，所以修改一个，另一个也会修改,
	! 同时在结束后，p6和p7的name和price的地址都被释放了，所以会报错
	*/
	Product p7(p6);
	p6.print_object();
	p7.print_object();
}
```
运行结果：
深拷贝（Deep Copy ）：
```text     
Three
Deep Copy constructor 
Product: 0x7ffca3f9d030, Name: Box6, Category: Toy6, Years: 3, Years Address:0x5647a4c2ceb0
Product: 0x7ffca3f9d080, Name: Box6, Category: Toy6, Years: 3, Years Address:0x5647a4c2d2e0
-----------------------------
Product destructor Name:Box6
Product destructor Name:Box6
``` 
浅拷贝（Shallow Copy ）：
```text
Three
Shallow Copy constructor 
Product: 0x7fff3af194b0, Name: Box6, Category: Toy6, Years: 3, Years Address:0x5643441eaeb0
Product: 0x7fff3af19500, Name: Box6, Category: Toy6, Years: 3, Years Address:0x5643441eaeb0
-----------------------------
Product destructor Name:Box6
Product destructor Name:Box6
free(): double free detected in tcache 2 // [!code error]
Aborted (core dumped) // [!code error]
```
:::


### Move constructor 和 Move semantics

**移动语义**：<br>
移动语义是一种优化技术，它允许将一个对象的所有资源（如内存、文件句柄等）快速地转移到另一个对象，而不需要复制这些资源。这样可以避免不必要的内存分配和复制，提高程序的性能。

移动构造函数和移动赋值运算符是C++11引入的新特性，用于实现移动语义。移动构造函数和移动赋值运算符的语法与拷贝构造函数和拷贝赋值运算符类似，但它们的参数类型是右值引用（rvalue reference）。右值引用是一种特殊的引用类型，它可以引用临时对象（即右值）。
在构造函数中用`std::move()`将左值转换为右值，从而调用移动构造函数。

::: details Move constructor 和 Move semantics
在 `Product.cpp`中 添加move构造方法：
```cpp
声明：
Product(Product&& p);
int * moveYears(){
    int *temp = this->years;
    this->years =nullptr;
    return temp;
}
实现：
Product::Product(Product &&p):years(p.moveYears()) {
    cout<<"Move constructor "<<endl;
}
```
在 `main.cpp`中 添加代码：
```cpp
int main(int argc, char *argv[]) {
	/*
	! 移动构造函数
	*/
	Product p1(move(Product(2)));
	p1.print_object();
	/*
	编译器自动进行了返回值优化(Return Value Optimization，RVO)，即直接在返回值上构造对象，而不是先构造临时对象，再拷贝构造返回值,c++17中是强制的，c++11中是可选的
	*/
	Product p2(Product(2)); 
	p2.print_object();
	cout<<"-----------------------------"<<endl;
}
```
运行结果：
```text
Zero
Move constructor 
Product destructor Name:
Product: 0x7ffff89f07d0, Years: 2, Years Address:0x55a4bee7aeb0
Zero
Product: 0x7ffff89f0820, Years: 2, Years Address:0x55a4bee7b2e0
-----------------------------
Product destructor Name:
Product destructor Name:
```
:::
## struct和class的区别
1. 默认访问权限不同：在C++中，struct的默认访问权限是public，而class的默认访问权限是private。
2. 继承方式不同：在C++中，struct可以继承class，而class也可以继承struct。但是，struct继承class时，默认的继承方式是public，而class继承struct时，默认的继承方式是private。

