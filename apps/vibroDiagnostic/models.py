from django.shortcuts import render
from django.db import models, connection
from django.contrib.auth.models import User




class Zavod (models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField('Нзвание завода', max_length=255)
    description = models.TextField('Описание завода')
    dateAdd = models.DateTimeField('дата добавления')
    code = models.IntegerField('классификатор для доступа')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'Завод'
        verbose_name_plural = 'Заводы'
    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        cursor = connection.cursor()
        cursor.execute('CREATE TABLE '+self.name+'_messages (id serial PRIMARY KEY,title varchar(255),text varchar(255),"time" bigint, idplc bigint)')
        models.Model.save(self)
    def delete(self, using=None, keep_parents=False):
        cursor = connection.cursor()
        cursor.execute('DROP TABLE IF EXISTS '+self.name+'_messages;')
        print('deleted point')
        models.Model.delete(self)


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
    to_vibro = models.BooleanField('разрешить просмотр вибро')
    to_oee = models.BooleanField('разрешить просмотр ОЕЕ')
    to_jurnal = models.BooleanField('разрешить просмотр журнала')
    to_3d = models.BooleanField('разрешить просмотр 3D сканера')
    to_message = models.BooleanField(' просмотр сообщений', default=False)
    zavod = models.ForeignKey(Zavod, on_delete=models.CASCADE, default=1, verbose_name='Принадлежность к заводу')


class Ceh(models.Model):
    id = models.AutoField(primary_key=True)
    parentid = models.ForeignKey(Zavod, on_delete=models.CASCADE)
    name = models.CharField('Нзвание цеха', max_length=255)
    description = models.TextField('Описание цеха')
    dateAdd = models.DateTimeField('дата добавления')
    code = models.IntegerField('классификатор для доступа')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'Цех'
        verbose_name_plural = 'Цеха'

class Oborudovanie(models.Model):
    id = models.AutoField(primary_key=True)
    parentid = models.ForeignKey(Ceh, on_delete=models.CASCADE)
    name = models.CharField('Нзвание оборудования', max_length=255)
    description = models.TextField('Описание оборудования')
    ipUzel = models.CharField('ip адрес узла для сбора ОЕЕ', default='', max_length=255)
    register = models.IntegerField('начальный адрес регистра для чтения данных',default=0)
    registercol = models.IntegerField('количество регистров',default=0)
    dateAdd = models.DateTimeField('дата добавления')
    code = models.IntegerField('классификатор для доступа')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name='Еденица оборудования'
        verbose_name_plural='Еденицы оборудования'

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        cursor = connection.cursor()
        cursor.execute('CREATE TABLE '+self.name+'_OEE (id serial PRIMARY KEY,run int,stop int,error int,"time_start" bigint, "time_end" bigint)')
        models.Model.save(self)
    def delete(self, using=None, keep_parents=False):
        cursor = connection.cursor()
        cursor.execute('DROP TABLE IF EXISTS '+self.name+'_OEE; ')
        print('deleted point')
        models.Model.delete(self)

class Point(models.Model):
    id = models.AutoField(primary_key=True)
    parentid = models.ForeignKey(Oborudovanie, on_delete=models.CASCADE)
    name = models.CharField('Нзвание точки', max_length=255)
    nametable = models.CharField('Нзвание таблицы', max_length=255)
    description = models.TextField('Описание точки')
    descriptionplace = models.TextField('Описание места установки')
    power = models.FloatField('мощность ИМ')
    w = models.FloatField('обороты в секунду')
    dateAdd = models.DateTimeField('дата добавления')
    code = models.IntegerField('классификатор для доступа')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name='Точка контроля'
        verbose_name_plural='Точки контроля'
    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        cursor = connection.cursor()
        cursor.execute('CREATE TABLE '+self.nametable+'(id serial PRIMARY KEY,value real,"time" bigint, idplc bigint)')
        models.Model.save(self)
    def delete(self, using=None, keep_parents=False):
        cursor = connection.cursor()
        cursor.execute('DROP TABLE IF EXISTS '+self.nametable+'; ')
        print('deleted point')
        models.Model.delete(self)


