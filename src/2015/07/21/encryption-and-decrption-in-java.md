# Encryption and Decryption in Java
## using a private key and AES algorithm.
java, encryption, decryption, code, aes

### Secret
At times, it requires that data in transit/storage be kept secret from on lookers.
There are plenty of available encryption mechanism in Java.
[Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (AES) is a symmetric key (i.e., same key for encryption/decryption) algorithm widely used to encrypt and decrypt data.

### Hexadecimal String.
This post explains how to encrypt the hexadecimal string and to decrypt the encoded string.  

### Imports
    import java.io.UnsupportedEncodingException;
    import java.util.Base64;

    import javax.crypto.Cipher;
    import javax.crypto.SecretKey;
    import javax.crypto.spec.SecretKeySpec;

    import javax.xml.bind.DatatypeConverter;

    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;

### Initilization

    // Objects required for encryption/decryption
    private final SecretKey secretKey;
    private final Logger logger;
    private final Base64.Encoder encoder;
    private final Base64.Decoder decoder;

    // In constructor
    this.secretKey = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
    this.logger = LoggerFactory.getLogger(getClass());
    this.encoder = Base64.getUrlEncoder();
    this.decoder = Base64.getUrlDecoder();


* Here, `key` is argument to the constructor.
* `key` should be of length 16 bytes (128 bits)
* We can even generate this dynamically, if the need be.

### Encryption

    public String encrypt(String plainText) {
        try {

            // Get byte array which has to be encrypted.
            byte[] plainTextByte = toByteArray(plainText);

            // Encrypt the bytes using the secret key
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedByte = cipher.doFinal(plainTextByte);

            // Use Base64 encoder to encode the byte array
            // into Base 64 representation. Requires Java 8.
            return encoder.encodeToString(encryptedByte);

        } catch (Exception e) {
            logger.error("Failed to encrypt", e);
        }

        return null;
    }

This is how encryption works.

* Use `toByteArray` to get byte array representation of hexadecimal string.
* Encrypt the byte array, using the given key and produce the encrypted byte array.
* Now, Encode the encrypted byte array using `Base64.Encoder`
* So, original hexadecimal String is encrypted and encoded into base 64 format.
* In short, hexadecimal string -> byte array -> encrypted byte array -> encoded to base64.

### Decryption

        public String decrypt(String encrypted) {
            try {
                // Decode Base 64 String into bytes array.
                byte[] encryptedByte = decoder.decode(encrypted);

                //Do the decryption
                Cipher cipher = Cipher.getInstance("AES");
                cipher.init(Cipher.DECRYPT_MODE, secretKey);
                byte[] decryptedByte = cipher.doFinal(encryptedByte);

                // Get hexadecimal string from the byte array.
                return toHexString(decryptedByte);

            } catch (Exception e) {
                logger.error("Failed to decrypt {}", encrypted, e);
            }
            return null;
        }
    }

This is how decryption works.

* Decode the Base 64 format and get the byte array of encrypted and encoded String.
* Decrypt the byte array using the same key used for encryption.
* Decrypted byte array represent the input byte array which was encrypted.
* Now use the `toHexString` method to get back the original hexadecimal string.
* In short, base64 encoded string -> encrypted byte array -> decrypted byte array -> original hexadecimal string.

### Hexadecimal String to equivalent Binary and vice versa.

    private byte[] toByteArray(String s) {
        return DatatypeConverter.parseHexBinary(s);
    }

    private String toHexString(byte[] array) {
        return DatatypeConverter.printHexBinary(array).toLowerCase();
    }

### Notes
* Key length can be 128, 192 or 256 bits.
* Key length of 128 bit can be directly used, whereas larger size has to be manually enabled.
* Proper care has to be taken to keep the Secret key a secret, otherwise no point in encryption.
* Here, Url Encoder in Base64 is used to create url safe string.
* Java 8 is required for `java.util.Base64`. Alternatively use [Apache Common Codec](https://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/binary/Base64.html) for Base64 encoding and decoding.
* In case of plain text,
    * Encryption: we can directly get the `plainTextByte` using `plainText.getBytes("UTF-8")`
    * Decryption: we can directly construct the original string using `new String(decryptedByte,"UTF-8")`
