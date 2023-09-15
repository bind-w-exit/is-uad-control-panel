import { Button, StyleSheet, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { DocumentPickerAsset } from 'expo-document-picker';

export default function App() {
  const [documentToUpload, setDocumentToUpload] = useState<DocumentPickerAsset>(null);

  const pickDocument = async () => {
    try {
      const documentPickerResult = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false
      });

      if (documentPickerResult.assets?.length ?? 0 === 0) {
        setDocumentToUpload(documentPickerResult.assets[0]);
        console.log(`selected file: ${documentPickerResult.assets[0].name}`);
      } else {
        console.log("file selection canceled");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postDocument = () => {
    const url = "http://192.168.10.107:8000/upload";

    const formData = new FormData();    
    formData.append('document', documentToUpload.file);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    console.log(JSON.stringify(formData));
    fetch(url, options).catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Pick Document" onPress={pickDocument} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Post Document" onPress={postDocument} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});