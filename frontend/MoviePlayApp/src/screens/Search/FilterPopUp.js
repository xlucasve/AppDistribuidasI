import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Order_asc from '../../assets/images/order_asc.svg';
import Order_desc from '../../assets/images/order_desc.svg';

const FilterPopup = ({
  visible,
  onClose,
  onApply,
  orderByMethod,
  setOrderByMethod,
  selectedGenres,
  setSelectedGenres,
  selectedOrderASC,
  setSelectedOrderASC,
}) => {
  const genreMap = {
    Comedia: 'Comedy',
    Acción: 'Action',
    Drama: 'Drama',
    Animación: 'Animation',
    'Cine de autor': 'Art Cinema',
    'Film Noir': 'Film Noir',
    Familiar: 'Family',
    Deportes: 'Sports',
    Histórica: 'Historical',
    Biografía: 'Biography',
    Thriller: 'Thriller',
    Suspenso: 'Suspense',
    Musical: 'Musical',
    Western: 'Western',
    Documental: 'Documentary',
    Guerra: 'War',
    Romance: 'Romance',
    Misterio: 'Mystery',
    Fantasía: 'Fantasy',
  };
  const orderOptions = [
    {label: 'Año de publicación', value: 'DATE'},
    {label: 'Calificación', value: 'RATING'},
  ];

  const toggleGenre = genre => {
    if (selectedGenres.includes(genreMap[genre])) {
      setSelectedGenres(selectedGenres.filter(g => g !== genreMap[genre]));
    } else {
      setSelectedGenres([...selectedGenres, genreMap[genre]]);
    }
  };

  const applyFilters = () => {
    onApply(selectedGenres, selectedOrderASC, orderByMethod);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtros de búsqueda</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={hp('4%')} color={'#FAFAFA'} />
            </TouchableOpacity>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>Ordenar por:</Text>
            <View style={styles.orderContainer}>
              <Dropdown
                data={orderOptions}
                labelField="label"
                valueField="value"
                placeholder="Selecciona una opción"
                value={orderByMethod}
                onChange={item => setOrderByMethod(item.value)}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.dropdownContainerStyle}
                itemContainerStyle={styles.dropdownItemContainerStyle}
                itemStyle={styles.itemStyle}
                activeColor="#313131"
              />
              <Pressable
                style={styles.orderBtn}
                onPress={() => setSelectedOrderASC(!selectedOrderASC)}>
                {selectedOrderASC === true ? (
                  <Order_asc
                    width={styles.heigth_width_order.width}
                    height={styles.heigth_width_order.width}
                  />
                ) : (
                  <Order_desc
                    width={styles.heigth_width_order.width}
                    height={styles.heigth_width_order.width}
                  />
                )}
              </Pressable>
            </View>
          </View>

          <View style={styles.genreContainer}>
            <Text style={styles.genreContainer.title}>Géneros</Text>
            <ScrollView
              style={styles.genreContainer.genreScrollContainer}
              contentContainerStyle={styles.genreContainer.genreScrollContent}>
              <View style={styles.genreContainer.chipsContainer}>
                {Object.keys(genreMap).map((genre, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.genreContainer.genreChip,
                      selectedGenres.includes(genreMap[genre]) &&
                        styles.genreContainer.genreChipSelected,
                    ]}
                    onPress={() => toggleGenre(genre)}>
                    <Text style={styles.genreContainer.genreText}>{genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.apply.container}>
            <TouchableOpacity style={styles.apply.btn} onPress={applyFilters}>
              <Text style={styles.apply.text}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp('85%'),
    backgroundColor: '#252525',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp('.5%'),
  },
  title: {
    fontSize: hp('3%'),
    marginBottom: hp('2%'),
    color: '#FAFAFA',
    fontWeight: 'bold',
  },
  genreContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    title: {
      color: '#BEBEBE',
      fontSize: hp('2.5%'),
      fontWeight: 'medium',
      marginBottom: 10,
    },
    chipsContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    genreChip: {
      backgroundColor: '#976B79',
      borderRadius: 20,
      padding: hp('1%'),
      margin: wp('1%'),
      borderWidth: 2,
      borderColor: '#A0153E',
      elevation: 2,
    },
    genreChipSelected: {
      backgroundColor: '#A0153E',
    },
    genreText: {
      color: '#000',
    },
    genreScrollContainer: {
      maxHeight: hp('30%'), // Adjust the max height as needed
    },
    genreScrollContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },

  dropdownContainer: {
    marginBottom: hp('2%'),
  },

  dropdownTitle: {
    color: '#BEBEBE',
    fontSize: hp('2.5%'),
    fontWeight: 'medium',
    marginBottom: 10,
  },

  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdown: {
    height: hp('6%'),
    width: wp('60%'),
    backgroundColor: '#313131',
    borderColor: '#BEBEBE',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  orderBtn: {
    marginRight: wp('.5%'),
  },

  heigth_width_order: {
    height: hp('10%'),
    width: wp('10%'),
  },

  placeholderStyle: {
    color: '#BEBEBE',
    fontSize: hp('2%'),
    backgroundColor: '#313131',
  },
  selectedTextStyle: {
    color: '#FAFAFA',
    fontSize: hp('2%'),
    backgroundColor: '#313131',
  },
  inputSearchStyle: {
    color: '#000',
    fontSize: hp('2%'),
    backgroundColor: '#313131',
  },
  itemTextStyle: {
    color: '#FAFAFA',
    backgroundColor: '#313131',
    fontSize: hp('2%'),
  },
  dropdownContainerStyle: {
    backgroundColor: '#252525',
    borderRadius: 10,
    overflow: 'hidden',
  },
  dropdownItemContainerStyle: {
    backgroundColor: '#313131',
  },

  apply: {
    container: {
      borderTopWidth: 1,
      borderTopColor: '#AAAAAA',
      padding: hp('1%'),
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    text: {
      color: '#A0153E',
      fontSize: hp('2.3%'),
      fontWeight: 'medium',
    },
  },
});

export default FilterPopup;
