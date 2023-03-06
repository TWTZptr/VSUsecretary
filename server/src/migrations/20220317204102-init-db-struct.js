'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Directions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      direction_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Directions',
          key: 'id',
        },
        onDelete: 'set null',
      },
      education_level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      patronymic: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      publications: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Groups',
          key: 'id',
        },
        onDelete: 'set null',
      },
    });

    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      patronymic: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      academic_degree: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      academic_rank: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      another_job: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    });
    await queryInterface.createTable('TakeDays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
    await queryInterface.createTable('EmployeesTakeDays', {
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        references: {
          model: 'Employees',
          key: 'id',
          onDelete: 'CASCADE',
        },
        onDelete: 'CASCADE',
      },
      take_day_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        references: {
          model: 'TakeDays',
          key: 'id',
          onDelete: 'CASCADE',
        },
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.createTable('DegreeWorks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mark: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      pages_number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      originality: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      supervisor_mark: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      reviewer_mark: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      implementation: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      student_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id',
          onDelete: 'set null',
        },
      },
      reviewer_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id',
          onDelete: 'set null',
        },
      },
      supervisor_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id',
          onDelete: 'set null',
        },
      },
      take_day_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'TakeDays',
          key: 'id',
          onDelete: 'SET NULL',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DegreeWorks');
    await queryInterface.dropTable('EmployeesTakeDays');
    await queryInterface.dropTable('TakeDays');
    await queryInterface.dropTable('Employees');
    await queryInterface.dropTable('Students');
    await queryInterface.dropTable('Groups');
    await queryInterface.dropTable('Directions');
  },
};
