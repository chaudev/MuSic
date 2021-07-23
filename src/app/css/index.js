import {StyleSheet} from 'react-native';
import {settings} from '../../config';

const colors = settings.colors;

const main = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderBottomWidth: 0.5,
    borderColor: '#ECEFF1',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textAppName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tabMenu: {
    height: 40,
    backgroundColor: settings.colors.mainColor,
    borderBottomWidth: 0.5,
    borderColor: '#ECEFF1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlContainer: {
    backgroundColor: settings.colors.mainColor,
    width: '100%',
    height: 50,
    borderTopWidth: 0.5,
    borderColor: '#ECEFF1',
  },
  control: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  controlImage: {
    width: 40,
    height: 40,
    borderRadius: 500,
  },
  controlButton: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlPlay: {
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    paddingLeft: 10,
  },
  controlNext: {
    width: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const modal = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  leftButton: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rightButton: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export {main, modal};