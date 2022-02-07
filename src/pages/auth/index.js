import React, {useState} from 'react'
import { Row, Col, Form, Input, Checkbox, Button, Image} from 'antd';
import "../../../node_modules/antd/dist/antd.css"
import { useAuth } from '../../hooks'
import {useBoolean, useToast} from "@chakra-ui/react"


const Login = () => {
    const [show, setShow] = useState(false)
    const [state, setState] = useState({email:'admin@insafacademy.com',password:'insaf@123'})
    const [loading, setLoading] = useBoolean()
    const auth = useAuth()
    const toast = useToast()

    const handleInputChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading.on()
        auth.login(state)
            .then((res) => {
                setLoading.off()
            })
            .catch((err) => {
                setLoading.off()
                console.log("Error", err)
                toast({
                    title: "Authentication Error!",
                    description: err.error,
                    status: "error",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                  })
            })

    }
    return(
        <Row justify="center" align='middle' style={{height:'100vh',backgroundColor:'rgb(140,114,172)'}}>
            <Col lg={{ span: 12 }} >
                <Row gutter={[32,32]} style={{ borderRadius: '25px 0px',overflow:'hidden'}}>
                    <Col span={12} style={{backgroundColor:'white'}}>
                        <Image src="/images/hospitalisation.png"/>
                    </Col>
                    <Col span={12} style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:"rgb(243,237,245)"}} >
                    <Form style={{width:'100%'}}>
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                        
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>Login</Button>
                        </Form.Item>
                    </Form>
                    </Col>
                </Row>
            </Col>
        </Row>       
    )
}

export default Login


