import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Title from "../components/Title";
import SafeContainer from "../components/SafeContainer";
import { ICON, STYLE } from "../components/config.js";
import { StyleSheet, Image } from "react-native";
import { RED } from "../components/config.js";

const SignupContainer = styled.View`
  margin-bottom: 15px;
`;

const InputContainer = styled.View`
  margin-top: 15px;
`;

const FormContainer = styled.View`
  margin-bottom: 20px;
`;

const FormInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 80%;
  margin: 10px 0;
`;

const Unit = styled.Text`
  font-size: 12px;
  font-family: "FredokaOne";
  width: 60px;
  text-align: center;
`;

const Signup = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sportPerWeek, setSportPerWeek] = useState(0);
  const [pricePerMeal, setPricePerMeal] = useState(0);

  const handleSignup = async (credentials) => {
    return fetch(`http://${host}:3000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((json) => {})
      .catch((err) => console.log(err));
  };

  return (
    <SafeContainer>
      <Image style={styles.mediumIcon} source={ICON} />
      <Title fontSize={"25px"} additionnalStyle={{ marginTop: 30 }}>
        {"Inscription"}
      </Title>
      <ScrollViewContainer>
        <SignupContainer>
          <InputContainer>
            <InputLabel additionnalStyle={{ marginBottom: 5 }}>
              {"Identifiant"}
            </InputLabel>
            <Input placeholder={"Email"} onChangeText={(e) => setUser(e)} />
          </InputContainer>

          <InputContainer>
            <InputLabel additionnalStyle={{ marginBottom: 5 }}>
              {"Mot de passe"}
            </InputLabel>
            <Input
              placeholder={"Mot de passe"}
              onChangeText={(e) => setPassword(e)}
              secureTextEntry={true}
            ></Input>
          </InputContainer>

          <InputContainer>
            <InputLabel additionnalStyle={{ marginBottom: 5 }}>
              {"Confirmation"}
            </InputLabel>
            <Input
              placeholder={"Confirmer le mot de passe"}
              onChangeText={(e) => setConfirm(e)}
              secureTextEntry={true}
            ></Input>
          </InputContainer>
          {password.length > 0 && confirm.length > 0 && confirm != password && (
            <Title
              fontSize={"12px"}
              additionnalStyle={{
                textAlign: "center",
                marginTop: 5,
                color: RED,
              }}
            >
              {"Les mots de passe ne correspondent pas"}
            </Title>
          )}
        </SignupContainer>

        <FormContainer>
          <FormInputContainer>
            <InputLabel additionnalStyle={styles.inputTag}>{"Age"}</InputLabel>
            <Input
              type={"numeric"}
              onChangeText={(e) => setAge(e)}
              maxLength={2}
              placeholder={"Ex : 18"}
            />
            <Unit>{""}</Unit>
          </FormInputContainer>

          <FormInputContainer>
            <InputLabel additionnalStyle={styles.inputTag}>
              {"Taille"}
            </InputLabel>
            <Input
              type={"numeric"}
              maxLength={3}
              onChangeText={(e) => setHeight(e)}
              placeholder={"Ex : 170"}
            />
            <Unit>{"cm"}</Unit>
          </FormInputContainer>

          <FormInputContainer>
            <InputLabel additionnalStyle={styles.inputTag}>
              {"Poids"}
            </InputLabel>
            <Input
              width={"200px"}
              type={"numeric"}
              maxLength={3}
              onChangeText={(e) => setWeight(e)}
              placeholder={"Ex : 60"}
            />
            <Unit>{"kg"}</Unit>
          </FormInputContainer>

          <FormInputContainer>
            <InputLabel additionnalStyle={styles.inputTag}>
              {"Pratique sportive"}
            </InputLabel>
            <Input
              type={"numeric"}
              maxLength={1}
              onChangeText={(e) => setSportPerWeek(e)}
              placeholder={"Ex : 3"}
            />
            <Unit>{"jrs / sem"}</Unit>
          </FormInputContainer>

          <FormInputContainer>
            <InputLabel additionnalStyle={styles.inputTag}>
              {"Objectif"}
            </InputLabel>
            <Input
              type={"numeric"}
              maxLength={3}
              onChangeText={(e) => setPricePerMeal(e)}
              placeholder={"Ex : 18"}
            />
            <Unit>{"€ / repas"}</Unit>
          </FormInputContainer>
        </FormContainer>
        <Button
          handlePress={() =>
            console.log(
              user,
              password,
              age,
              height,
              weight,
              sportPerWeek,
              pricePerMeal
            )
          }
        >
          {"S'inscrire"}
        </Button>
      </ScrollViewContainer>

      <StatusBar style="auto" />
    </SafeContainer>
  );
};

export default Signup;

const styles = StyleSheet.create({
  ...STYLE,
  inputTag: {
    width: 85,
  },
});
