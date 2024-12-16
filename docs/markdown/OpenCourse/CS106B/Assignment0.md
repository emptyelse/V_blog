# Welcome to CS106B!

## 课程内容
Assignment0 对应的三节课程内容分别是：
- [Introducion to C++](https://www.youtube.com/watch?v=FIroM06V2MA&list=PL-h0BZdG_K4kAmsfvAik-Za826pNbQd0d&index=1&pp=iAQB)
- [Functions](https://www.youtube.com/watch?v=FIroM06V2MA&list=PL-h0BZdG_K4kAmsfvAik-Za826pNbQd0d&index=1&pp=iAQB)
- [Strings](https://www.youtube.com/watch?v=Gc6Gwk42vR4&list=PL-h0BZdG_K4kAmsfvAik-Za826pNbQd0d&index=3&pp=iAQB)

这主要是由于他们的学生很多之前并未接触过C++(但都有Python或者Java的基础)，所以有一个衔接课程，但是这门课程的主要内容不在C++上，所以并没有太过详细介绍，有C++基础的可以直接跳过

## 作业实例
这个作业是所有作业里最重要的，也就是**环境配置**。
但课程提供了比较完善的指导，按照它的指导一步步做，基本上都能成功配置。
>[!NOTE] 
>这个作业其实就是把他的库（CS106.a）进行编译和下载，并运行一个测试程序,你需要注意的是，确保你下载的库与你后续的作业版本匹配，具体可见这个[Readme](https://github.com/Andy-xiaokang/CS106B/blob/master/README.md#postscript),如果你使用的是QT creator，就非常容易，点击运行即可。

## 其他
这个库在后续作业以及课程中，都要使用。但由于QT很难用，而且本人比较喜欢使用Cmake来编译，以下是仅供参考的CmakeLits.txt

主要用于跟随Lecture敲代码时使用

``` Cmake{3,6}
cmake_minimum_required(VERSION 3.16)
project(TestCS106)
set(CMAKE_PREFIX_PATH "你的qt安装路径")
find_package(Qt6 REQUIRED COMPONENTS Core Gui Widgets Network Multimedia)

set(SPL_DIR "你的cs106库路径")
set(STATIC_LIB "${SPL_DIR}/lib/libcs106.a")
include_directories(${Qt6Core_INCLUDE_DIRS} ${Qt6Gui_INCLUDE_DIRS} ${Qt6Widgets_INCLUDE_DIRS})

add_executable(test_cs106 main.cpp)
target_include_directories(test_cs106 PRIVATE "${SPL_DIR}/include")
target_link_libraries(test_cs106 PRIVATE Qt6::Core Qt6::Gui Qt6::Widgets)

```