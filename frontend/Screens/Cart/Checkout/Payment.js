import React, { useState } from 'react'
import { View, Button, Pressable, FlatList, TouchableOpacity, Dimensions, } from 'react-native'


import {
    Container,
    Text,
    Radio,
    Right,
    Left,
    Picker,
    Box,
    HStack,
    VStack,
    Heading,
    Divider,
    CheckCircleIcon,
    Select,
    CheckIcon,

} from 'native-base';

import { useNavigation } from '@react-navigation/native';

const methods = [
    { name: 'Cash', value: 'Cash' },
    { name: 'Bank Transfer', value: 'Bank Transfer' },
    { name: 'Gcash', value: 'Gcash' },

]

const Payment = (props) => {
    const request = props.route.params;

    const [selected, setSelected] = useState('');
    const [card, setCard] = useState('');
    const navigation = useNavigation()

    const payment = () => {
        console.log(selected, 'selected')
        navigation.navigate("Confirm", { request: request, payment: selected })

    }


    return (
        <Container flex="1" >
            <Heading>
                <Text>Choose your payment method</Text>
            </Heading>

            <HStack bg="red.200" width="100%"  >
                <Radio.Group
                    name="myRadioGroup"
                    value={selected}
                    onChange={(value) => {
                        setSelected(value);
                    }}
                >
                    {console.log(selected)}
                    {methods.map((item, index) => {
                        return (
                            <Radio
                                key={index}
                                value={item.value} my="1"
                                colorScheme="green"
                                size="22"
                                style={{ float: 'right' }}
                                icon={<CheckCircleIcon size="22" mt="0.5" color="emerald.500" />}

                            >
                                {item.name}
                            </Radio>
                        )
                    })
                    }
                </Radio.Group>
            </HStack>
            {selected === 3 ? (
                <Box>
                    <Select
                        minWidth="100%"
                        placeholder="Choose Service"
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                    >
                        {console.log(card)}
                        {paymentCards.map((c, index) => {
                            return (
                                <Select.Item
                                    key={c.name}
                                    label={c.name}
                                    value={c.name} />
                            )
                        })}

                    </Select>
                </Box>
            ) : null}
            <View style={{ marginTop: 60, alignSelf: 'center' }}>
                <Button
                    title={"Confirm"}
                    onPress={() => payment()} />
            </View>
        </Container>
    )
}
export default Payment;